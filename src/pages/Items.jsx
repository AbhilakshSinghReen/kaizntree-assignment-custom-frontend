import { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import {
  AccountTree as AccountTreeIcon,
  Category as CategoryIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";

import apiServices from "../api/services";
import ItemsTable from "../components/ItemsTable";
import ProgressBarWithLabel from "../components/ProgressBarWithLabel";
import { delay } from "../utils/jsUtils";

export default function Items() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [categoriesById, setCategoriesById] = useState({});
  const [subcategoriesById, setSubcategoriesById] = useState({});
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionProgressPercentage, setDeletionProgressPercentage] = useState(0.0);

  const getCategoriesFromApi = async () => {
    const response = await apiServices.models.getAll("item-categories");
    if (!response.success) {
      console.log(response);
      return;
    }

    const fetchedCategories = response.data;

    const updatedCategoriesById = {};
    for (const category of fetchedCategories) {
      updatedCategoriesById[category.id] = category;
    }

    setCategories(fetchedCategories);
    setCategoriesById(updatedCategoriesById);
  };

  const getSubcategoriesFromApi = async () => {
    const response = await apiServices.models.getAll("item-subcategories");
    if (!response.success) {
      console.log(response);
      return;
    }

    const fetchedSubcategories = response.data;

    const updatedSubcategoriesById = {};
    for (const subcategory of fetchedSubcategories) {
      updatedSubcategoriesById[subcategory.id] = subcategory;
    }

    setSubcategories(response.data);
    setSubcategoriesById(updatedSubcategoriesById);
  };

  const getItemsFromApi = async () => {
    const response = await apiServices.models.getAll("items");
    if (!response.success) {
      console.log(response);
      return;
    }
    setItems(response.data);
  };

  const refreshAllFromApi = async () => {
    setIsLoading(true);

    await getCategoriesFromApi();
    await getSubcategoriesFromApi();
    await getItemsFromApi();

    setIsLoading(false);
  };

  const handleDeleteButtonClick = async (event) => {
    if (!window.confirm(`Are you sure you want to delete these ${selectedItemIds.size} items?`)) {
      return;
    }

    setDeletionProgressPercentage(0.0);
    setIsDeleting(true);

    const selectedItemIdsArr = Array.from(selectedItemIds);

    for (let i = 0; i < selectedItemIdsArr.length; i++) {
      const response = await apiServices.models.deleteSingle("items", selectedItemIdsArr[i]);
      if (!response.success) {
        console.log(response);
        break;
      }

      setDeletionProgressPercentage(((i + 1) / selectedItemIdsArr.length) * 100);
      await delay(1000);
    }

    setSelectedItemIds(new Set());
    setIsDeleting(false);
    setDeletionProgressPercentage(0.0);
    await refreshAllFromApi();
  };

  useEffect(() => {
    refreshAllFromApi();
  }, []);

  return (
    <div style={{ paddingTop: 70, paddingLeft: 270, paddingRight: 70 }}>
      <Box sx={headerStyle}>
        <Box sx={headerHalfPartStyle}>
          <h1 style={{ margin: 0 }}>Item Dashboard</h1>
          <h4 style={{ margin: 0 }}>All Items</h4>
        </Box>
        <Box sx={headerHalfPartStyle}>
          <Box sx={summaryRowStyle}>
            <Box sx={summaryRowFirstPartStyle}>
              <Box mr={2}>
                <AccountTreeIcon />
              </Box>
              <p>Total Categories</p>
            </Box>
            <p>{categories.length}</p>
          </Box>
          <Box sx={summaryRowStyle}>
            <Box sx={summaryRowFirstPartStyle}>
              <Box mr={2}>
                <CategoryIcon />
              </Box>
              <p>Total Items</p>
            </Box>
            <p>{items.length}</p>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <Button color="primary" variant="contained">
          New Item Category
        </Button>
      </Box>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <Button color="primary" variant="contained">
          Sub Categories Drop down
        </Button>
      </Box>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
        <Button color="primary" variant="contained">
          New Item
        </Button>

        <Button color="primary" variant="contained">
          Options Dropdown
        </Button>

        <Button color="primary" variant="contained">
          Search
        </Button>

        <IconButton color="error" variant="contained" fontSize="large" onClick={handleDeleteButtonClick}>
          <DeleteForeverIcon />
        </IconButton>
      </Box>

      {isDeleting && <ProgressBarWithLabel progressPercentage={deletionProgressPercentage} label="Deleting Items" />}

      <Box mb={4} />

      <ItemsTable
        items={items}
        categoriesById={categoriesById}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
      />
    </div>
  );
}

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const headerHalfPartStyle = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
};

const summaryRowStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const summaryRowFirstPartStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};
