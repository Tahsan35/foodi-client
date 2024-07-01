import { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8); // Number of items to display per page

  //loading data
  useEffect(() => {
    //fetch data from backend
    const fetchData = async () => {
      try {
        const res = await fetch("/menu.json");
        const data = await res.json();
        //console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    //call the function
    fetchData();
  }, []);

  //onotherwise
  //("/menu.json")
  //  .then((res) => res.json())
  //  .then((data) => {
  //     setMenu(data);
  //     setFilteredItems(data);
  //   });

  //filter items by category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // const filterItems = (category) => {
  //   if (category === "all") {
  //     setFilteredItems(menu);
  //   } else {
  //     setFilteredItems(menu.filter((item) => item.category === category));
  //   }
  //   setSelectedCategory(category);
  // };

  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setSortOption("default");
    setCurrentPage(1);
  };

  //sorting base on A-Z, Z-A low-high pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // code block
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //sort items
  // const sortItems = (option) => {
  //   if (option === "default") {
  //     setFilteredItems(menu);
  //   } else {
  //     setFilteredItems(
  //       menu.sort((a, b) => {
  //         if (option === "lowest") {
  //           return a.price - b.price;
  //         } else if (option === "highest") {
  //           return b.price - a.price;
  //         }
  //       })
  //     );
  //   }
  //   setSortOption(option);
  // };

  //pagination logic
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          {/* text */}
          <div className="space-y-7 px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-snug">
              For the Love of delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family and feel the joy of delicious food such as Greek
              Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas
              and more for a moderate cost
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap ">
            {/* all category btns */}
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : " "}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : " "}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : " "}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : " "}
            >
              Soup
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : " "}
            >
              Dessert
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : " "}
            >
              Drinks
            </button>
          </div>

          {/* sorting base filter */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>
            {/* sorting option */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A - Z</option>
              <option value="Z-A">Z - A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        {/* product card */}
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination section */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
          // <button
          //   key={index}
          //   onClick={() => paginate(index + 1)}
          //   className={currentPage === index + 1 ? "active" : ""}
          // >
          //   {index + 1}
          // </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
