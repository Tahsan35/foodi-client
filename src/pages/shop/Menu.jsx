import { useEffect, useState } from "react";
import Cards from "../../components/Cards";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

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
    //setSortOption("default");
  };

  //sorting base on A-Z, Z-A low-high pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = { ...filteredItems };

    //logic
    switch (option) {
      case "A - Z":
        sortedItems.sort((a, b) => a.name.localCompare(b.name));
        break;
      case "Z - A":
        sortedItems.sort((a, b) => b.name.localCompare(a.name));
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

  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
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
        {/* product card */}
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
