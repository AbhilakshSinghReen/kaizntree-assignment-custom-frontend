import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { AccountTree as AccountTreeIcon, Category as CategoryIcon } from "@mui/icons-material";

import apiServices from "../api/services";
import ItemsTable from "../components/ItemsTable";

export default function Items() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [categoriesById, setCategoriesById] = useState({});
  const [subcategoriesById, setSubcategoriesById] = useState({});
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    const response = await apiServices.models.getAll("items");
    if (!response.success) {
      console.log(response);
      return;
    }
    setItems(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategoriesFromApi();
    getSubcategoriesFromApi();
    getItemsFromApi();
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
      </Box>

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
