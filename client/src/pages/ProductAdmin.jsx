import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      console.log("Fetching products with:", { page, search });
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page,
          limit: 12,
          search,
        },
      });

      const { data: responseData } = response;
      console.log("API Response:", responseData);
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Use a single effect for both search and pagination changes
  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchProductData();
    }, 300); // Adding debounce for search functionality

    return () => clearTimeout(delayFetch);
  }, [page, search]); // Depend on both `page` and `search`

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search product here ..."
            className="h-full w-full outline-none bg-transparent"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset page when searching
            }}
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p) => (
              <ProductCardAdmin
                key={p._id}
                data={p}
                fetchProductData={fetchProductData}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="border border-primary-200 px-4 py-1 hover:bg-yellow-400"
            disabled={page === 1} // Disable if on the first page
          >
            Previous
          </button>
          <button className="w-full bg-slate-100">
            {page}/{totalPageCount}
          </button>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPageCount))
            }
            className="border border-primary-200 px-4 py-1 hover:bg-yellow-400"
            disabled={page === totalPageCount} // Disable if on the last page
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
