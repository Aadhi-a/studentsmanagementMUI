import Icon from "@components/global/Icon";
import { Colors } from "@unistyles/constants";
import { tableStyle } from "@unistyles/tableStyle";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Row } from "react-native-table-component";
import { useStyles } from "react-native-unistyles";
import { Dropdown } from "react-native-element-dropdown";
import StyledText from "@components/global/StylesText";

interface Column {
  headerName: string;
  fieldId: string;
  width?: number;
}

interface CustomTableProps {
  columns: Column[];
  data: Record<string, any>[];
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  rowStyle?: ViewStyle;
  rowTextStyle?: TextStyle;
  rowsPerPageOptions?: number[]; // [10,20,30,40]
  defaultRowsPerPage?: number;
  visiblePageNumbers?: number;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  containerStyle,
  headerStyle,
  headerTextStyle,
  rowStyle,
  rowTextStyle,
  rowsPerPageOptions = [5, 10, 20, 30, 40],
  defaultRowsPerPage = 5,
  visiblePageNumbers = 3,
}) => {
  const { styles } = useStyles(tableStyle);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const headers = columns.map((col) => col.headerName);
  const columnWidths = columns.map((col) => col.width || 100);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    let start = Math.max(currentPage - 1, 0);
    let end = Math.min(start + visiblePageNumbers - 1, totalPages - 1);
    start = Math.max(0, end - visiblePageNumbers + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  // Prepare dropdown data
  const dropdownData = rowsPerPageOptions.map((num) => ({
    label: num.toString(),
    value: num,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Rows per page selector */}

      {/* Horizontal Scroll Table */}
      <ScrollView horizontal>
        <View>
          <Row
            data={headers}
            widthArr={columnWidths}
            style={[styles.head, headerStyle]}
            textStyle={[styles.headText, headerTextStyle]}
          />

          {paginatedData.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[styles.row(rowIndex % 2 === 1), rowStyle]}
            >
              {columns.map((col, colIndex) => {
                const cellData = row[col.fieldId];
                const isAgeColumn = col.fieldId === "age";
                return (
                  <View
                    key={colIndex}
                    style={{
                      width: col.width || 100,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        rowTextStyle,
                        isAgeColumn
                          ? { color: Number(cellData) > 20 ? "red" : "green" }
                          : {},
                      ]}
                    >
                      {cellData}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Pagination */}

      <View style={styles.paginationContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <View>
            <StyledText
              variant="h6"
              fontFamily="HiMelodyRegular"
              color={Colors.neutralDark}
            >
              Rows per
            </StyledText>
            <StyledText
              variant="h6"
              fontFamily="HiMelodyRegular"
              color={Colors.neutralDark}
            >
              page:
            </StyledText>
          </View>
          <View style={{ width: 75 }}>
            <Dropdown
              data={dropdownData}
              labelField="label"
              valueField="value"
              value={rowsPerPage}
              onChange={(item) => {
                setRowsPerPage(Number(item.value));
                setCurrentPage(0);
              }}
              containerStyle={{ width: 70 }}
              style={styles.dropDown}
              placeholderStyle={{ color: Colors.neutral }}
              selectedTextStyle={{ color: Colors.neutral }}
            />
          </View>
        </View>
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={currentPage === 0}
            style={[
              styles.navButton,
              currentPage === 0 && styles.disabledButton,
            ]}
          >
            <Icon
              name="arrowLeft"
              size={15}
              color={currentPage === 0 ? Colors.neutral : "green"}
            />
          </TouchableOpacity>

          {visiblePages.map((p, idx) =>
            typeof p === "number" ? (
              <TouchableOpacity
                key={idx}
                onPress={() => setCurrentPage(p)}
                style={[
                  styles.pageNumber,
                  p === currentPage && styles.activePage,
                ]}
              >
                <Text
                  style={
                    p === currentPage ? styles.activeText : styles.pageText
                  }
                >
                  {p + 1}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text key={idx} style={[styles.pageNumber, styles.ellipsis]}>
                {p}
              </Text>
            )
          )}

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentPage === totalPages - 1}
            style={[
              styles.navButton,
              currentPage === totalPages - 1 && styles.disabledButton,
            ]}
          >
            <Icon
              name="arrowRight"
              size={15}
              color={currentPage === totalPages - 1 ? Colors.neutral : "green"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomTable;
