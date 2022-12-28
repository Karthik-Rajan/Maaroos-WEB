import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Row, Col, Container } from "react-bootstrap";
import CategoriesCarousel from "./common/CategoriesCarousel";
import ProductItems from "./common/ProductItems";
import SideBarHead from "./common/SideBarHead";
import SideBarFilter from "./common/SideBarFilter";
import SearchBar from "./common/SearchBar";
import { connect } from "react-redux";

let input = {
  lat: 0,
  lng: 0,
};

let location = {};

function List(props: any) {
  let [list, setList] = useState([]);
  let [sideBar, setSideBar] = useState(true);
  let [loading, setLoading] = useState(true);
  let [listCardClassName, setListCardClassName] = useState("productsListing");
  let [search, setSearch] = useState(input);
  useEffect(() => {
    props.vendor
      .then((res: any) => {
        setList(res.list);
        setLoading(false);
        input = res.search;
        location = res.location;
        setSearch({ ...input });
      })
      .catch((err: any) => {
        console.log("Error on Listing Page", err);
        setList([]);
        setLoading(false);
      });
  }, [props.vendor]);

  const onApplyFilter = () => {
    console.log("Filters", search);
    callVendorList();
  };

  const onFilter = (params: any) => {
    setSearch({ ...search, ...params });
  };

  const callVendorList = async () => {
    setLoading(true);

    input = { ...input, ...search };

    props.dispatch({
      type: "LOCATION",
      payload: { search: input, location },
    });
  };

  const toggleSideBar = (value: boolean) => {
    if (!sideBar == value) {
      setListCardClassName(
        listCardClassName == "productsListing"
          ? "productsListingW75"
          : "productsListing"
      );
      setSideBar(value);
    }
  };

  const resetFilters = () => {
    setSearch({ ...search });
  };

  return (
    <>
      {/* <PageTitle
        title="Offers Near You"
        subTitle="Best deals at your favourite restaurants"
      /> */}

      {/* <section className="section pt-5 searchBarSection">
        <Container>
          <SearchBar />
        </Container>
      </section> */}

      <section className={`section pt-5 pb-5 ` + listCardClassName}>
        <Container fluid className="productListingContainer">
          <SideBarHead
            onClose={toggleSideBar}
            listLength={list.length}
            sideBar={sideBar}
            search={search}
          />
          <Row>
            {sideBar && (
              <Col md={3}>
                <SideBarFilter
                  onClose={toggleSideBar}
                  filterList={list}
                  onFilter={onFilter}
                  onApply={onApplyFilter}
                  resetFilters={resetFilters}
                />
              </Col>
            )}
            <Col md={sideBar ? 9 : 12}>
              <CategoriesCarousel />
              <ProductItems products={list} loading={loading} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

function mapStateToProps(state: any) {
  return {
    vendor: state.vendor,
  };
}
export default connect(mapStateToProps)(List);
