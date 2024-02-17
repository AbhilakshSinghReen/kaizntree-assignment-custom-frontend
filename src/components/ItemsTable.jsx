import { Box, Checkbox, Grid, Typography } from "@mui/material";

export default function ItemsTable({ items, categoriesById, selectedItemIds, setSelectedItemIds }) {
  const handleSelectAllCheckboxClick = (isChecked) => {
    if (!isChecked) {
      setSelectedItemIds(new Set());
      return;
    }

    setSelectedItemIds(new Set(items.map((item) => item.id)));
  };

  const handleSelectCheckboxClick = (itemId, isChecked) => {
    const updatedSelectedItemIds = new Set(selectedItemIds);

    if (!isChecked) {
      updatedSelectedItemIds.delete(itemId);
    } else {
      updatedSelectedItemIds.add(itemId);
    }

    setSelectedItemIds(updatedSelectedItemIds);
  };

  return (
    <div style={styles.listContainer}>
      <Box sx={styles.listHeaderContainer}>
        <Box mr={1}>
          <Checkbox
            checked={items.length > 0 && selectedItemIds.size === items.length}
            onChange={(e) => handleSelectAllCheckboxClick(e.target.checked)}
          />
        </Box>

        <Grid container spacing={1}>
          <Grid sx={styles.gridItem} item md={2}>
            <Typography sx={styles.listHeaderCell} variant="h5" color="primary">
              SKU
            </Typography>
          </Grid>

          <Grid sx={styles.gridItem} item md={2}>
            <Typography sx={styles.listHeaderCell} variant="h5" color="primary">
              Name
            </Typography>
          </Grid>

          <Grid sx={styles.gridItem} item md={2}>
            <Typography sx={styles.listHeaderCell} variant="h5" color="primary">
              Tags
            </Typography>
          </Grid>

          <Grid sx={styles.gridItem} item md={2}>
            <Typography sx={styles.listHeaderCell} variant="h5" color="primary">
              Category
            </Typography>
          </Grid>

          <Grid sx={styles.gridItem} item md={2}>
            <Typography sx={styles.listHeaderCell} variant="h5" color="primary">
              In Stock
            </Typography>
          </Grid>

          <Grid sx={styles.gridItem} item md={2}>
            <Typography sx={styles.listHeaderCell} variant="h5" color="primary">
              Available Stock
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {items.map((item) => (
        <Box sx={styles.listItemContainer} key={item.id}>
          <Box mr={1}>
            <Checkbox
              checked={selectedItemIds.has(item.id)}
              onChange={(e) => handleSelectCheckboxClick(item.id, e.target.checked)}
            />
          </Box>

          <Grid container spacing={1}>
            <Grid sx={styles.gridItem} item md={2}>
              <Typography sx={styles.listHeaderCell} variant="h6" color="primary">
                {item.stock_keeping_unit}
              </Typography>
            </Grid>

            <Grid sx={styles.gridItem} item md={2}>
              <Typography sx={styles.listHeaderCell} variant="h6" color="primary">
                {item.name}
              </Typography>
            </Grid>

            <Grid sx={styles.gridItem} item md={2}>
              <Typography sx={styles.listHeaderCell} variant="h6" color="primary">
                Tags
              </Typography>
            </Grid>

            <Grid sx={styles.gridItem} item md={2}>
              <Typography sx={styles.listHeaderCell} variant="h6" color="primary">
                {categoriesById[item.category]?.name ?? "N/A"}
              </Typography>
            </Grid>

            <Grid sx={styles.gridItem} item md={2}>
              <Typography sx={styles.listHeaderCell} variant="h6" color="primary">
                {item.available_stock > item.minimum_stock ? "Yes" : "No"}
              </Typography>
            </Grid>

            <Grid sx={styles.gridItem} item md={2}>
              <Typography sx={styles.listHeaderCell} variant="h6" color="primary">
                {item.available_stock}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

const styles = {
  listContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listHeaderContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    marginBottom: 2,
    borderRadius: 1,
  },
  listHeaderCell: {
    borderRadius: 5,
    "&&": {
      marginRight: 5,
    },
  },
  gridItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    marginBottom: 1,
    borderRadius: 1,
  },
};
