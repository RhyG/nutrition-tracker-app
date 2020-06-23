import { StyleSheet } from "react-native";

import GlobalStyles from "../../config/globalStyles";
const { phorizontal20, offWhite, lightGrey } = GlobalStyles;

const styles = StyleSheet.create({
  container: {
    ...phorizontal20,
    backgroundColor: offWhite,
    paddingTop: 20,
  },
  dayContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: 20,
  },
  statsContainer: {
    height: 180,
  },
  mealRowsContainer: {
    backgroundColor: "#fff",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  tableHeadings: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeading: {
    fontWeight: "bold",
    fontSize: 16,
  },
  foodHeading: {
    width: "50%",
  },
  tableData: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: lightGrey,
    paddingVertical: 15,
  },
  newItemModal: {
    height: 300,
    width: 300,
    backgroundColor: "red",
  },
});

export const width50 = {
  width: "50%",
};

export default styles;
