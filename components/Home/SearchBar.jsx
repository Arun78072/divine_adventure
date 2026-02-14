import React, { useState, useEffect } from "react";
import {
  SearchForm,
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchResults,
  ResultItem,
} from "./SearchBar.styles";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import api from "@/utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();

  const getSearchDetailsApi = async (query) => {
    try {
      const response = await api.get(
        `/api/tour/search_tour?query=${query}`
      );

      if (response.status === 200) {
        setSearchData(response.data.data); // ✅ correct
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 3) {
        getSearchDetailsApi(query);
      } else {
        setSearchData([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleRedirect = (id) => {
    router.push(`/destination/view/${id}`);
    setQuery("");
    setSearchData([]);
  };

  return (
    <SearchForm>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton type="button">
          <IoSearch />
        </SearchButton>
      </SearchContainer>

      {/* 🔥 Search Results */}
      {searchData.length > 0 && (
        <SearchResults>
          {searchData.map((tour) => (
            <ResultItem
              key={tour._id}
              onClick={() => handleRedirect(tour._id)}
            >
              {tour?.tourInfo?.title}
            </ResultItem>
          ))}
        </SearchResults>
      )}
    </SearchForm>
  );
}
