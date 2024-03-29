import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CatalogItem } from "../../components/CatalogItem";
import { searchItem } from "../../features/search/searchSlice";
import { useTranslation } from "react-i18next";

export const Search = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();

  const searchRequest = searchParams.get("q");

  let navigate = useNavigate();
  const [search, setSearch] = useState(searchRequest ?? "");

  const submitHandler = (event) => {
    event.preventDefault();

    if (search.length >= 3) {
      navigate(`/search?q=${search}`);
    } else {
      alert("sorry, at least 3 chars!");
    }
  };

  const { items } = useSelector((store) => store.catalog);

  const { isLoad } = useSelector((store) => store.search);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchRequest)
  );

  return (
    <>
      <div className="search-container">
        <form onSubmit={submitHandler}>
          <label>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              name="text"
              placeholder={t("search_here")}
            />
          </label>
          <button
            type="submit"
            className="btn-search"
            onClick={() => {
              dispatch(searchItem());
            }}
          >
            <span>{t("find")}</span>
          </button>
        </form>
      </div>
      <section className="cart">
        <div>
          {isLoad
            ? filteredItems.map((item) => {
                return <CatalogItem key={item.id} {...item} />;
              })
            : null}
        </div>
      </section>
    </>
  );
};
