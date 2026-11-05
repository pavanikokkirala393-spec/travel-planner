
import React, { useState } from "react";
import {
  Search, MapPin, CalendarDays, Heart,
  Plus, Plane, Menu, X, ArrowUpRight
} from "lucide-react";
import "./App.css";

const places = [
  {
    id: 1,
    name: "Bali, Indonesia",
    category: "Beach",
    price: "$620",
    days: "5 days",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
  },
  {
    id: 2,
    name: "Swiss Alps",
    category: "Mountain",
    price: "$1240",
    days: "7 days",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800"
  },
  {
    id: 3,
    name: "Kyoto, Japan",
    category: "Culture",
    price: "$890",
    days: "4 days",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800"
  },
  {
    id: 4,
    name: "Amalfi Coast",
    category: "Beach",
    price: "$980",
    days: "6 days",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800"
  },
  {
    id: 5,
    name: "Manali, India",
    category: "Mountain",
    price: "₹12,500",
    days: "3 days",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
  },
  {
    id: 6,
    name: "Jaipur, India",
    category: "Culture",
    price: "₹9,500",
    days: "3 days",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [menu, setMenu] = useState(false);
  const [trip, setTrip] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || place.category === category;

    return matchesSearch && matchesCategory;
  });

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function createTrip(e) {
    e.preventDefault();

    setMessage(`Your trip "${trip}" has been created!`);
    setTrip("");
    setShowForm(false);

    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <h2 className="logo">✈ Wanderly<span>.</span></h2>

        <nav className={menu ? "nav-links show" : "nav-links"}>
          <a href="#home" onClick={() => setMenu(false)}>Home</a>
          <a href="#destinations" onClick={() => setMenu(false)}>Explore</a>
          <a href="#favorites" onClick={() => setMenu(false)}>
            Favorites ({favorites.length})
          </a>
        </nav>

        <button className="plan-btn"
          onClick={() => setShowForm(true)}>
          <Plus size={17}/> Plan Trip
        </button>

        <button className="menu-btn"
          onClick={() => setMenu(!menu)}>
          {menu ? <X/> : <Menu/>}
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-text">
          <p className="tagline">DISCOVER YOUR NEXT ADVENTURE</p>

          <h1>
            Explore the world,
            <span> one trip at a time.</span>
          </h1>

          <p className="description">
            Discover beautiful destinations, plan your
            journeys and create unforgettable memories.
          </p>

          <a href="#destinations" className="explore-btn">
            Explore Destinations <ArrowUpRight size={18}/>
          </a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200"
            alt="Beautiful mountain lake"
          />
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search-box">
        <div className="search-field">
          <Search/>
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button onClick={() =>
          document.getElementById("destinations")
            .scrollIntoView({ behavior: "smooth" })
        }>
          Search <ArrowUpRight size={17}/>
        </button>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations" id="destinations">

        <div className="section-heading">
          <div>
            <p className="tagline">FIND YOUR NEXT ESCAPE</p>
            <h2>Popular Destinations</h2>
          </div>
          <p>Explore amazing places around the world.</p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="filters">
          {["All", "Beach", "Mountain", "Culture"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* DESTINATION CARDS */}
        <div className="destination-grid">
          {filteredPlaces.map((place) => (
            <div className="card" key={place.id}>

              <div className="card-image">
                <img src={place.image} alt={place.name}/>

                <button
                  className="favorite"
                  onClick={() => toggleFavorite(place.id)}
                >
                  <Heart
                    fill={favorites.includes(place.id) ? "red" : "none"}
                    color={favorites.includes(place.id) ? "red" : "white"}
                  />
                </button>
              </div>

              <div className="card-content">
                <h3>{place.name}</h3>

                <p>
                  <MapPin size={15}/>
                  {place.category}
                </p>

                <div className="card-footer">
                  <span>
                    <CalendarDays size={15}/>
                    {place.days}
                  </span>

                  <strong>{place.price}</strong>
                </div>

                <button
                  className="card-btn"
                  onClick={() => {
                    setTrip(place.name);
                    setShowForm(true);
                  }}
                >
                  Plan this trip <ArrowUpRight size={16}/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <p className="empty">No destinations found.</p>
        )}
      </section>

      {/* FAVORITES */}
      <section className="favorites-section" id="favorites">
        <h2>Your Favourite Places ❤️</h2>
        <p>
          You have saved {favorites.length} destinations.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <h2>✈ Wanderly.</h2>
        <p>Travel more. Explore more. Live more.</p>
        <p>© 2026 Wanderly. All rights reserved.</p>
      </footer>

      {/* CREATE TRIP MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={createTrip}>
            <button
              type="button"
              className="close"
              onClick={() => setShowForm(false)}
            >
              <X/>
            </button>

            <h2>Create Your Trip</h2>

            <p>Give your next adventure a name!</p>

            <input
              type="text"
              placeholder="Enter trip name"
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">
              Create Trip
            </button>
          </form>
        </div>
      )}

      {message && <div className="toast">{message}</div>}

    </div>
  );
}

export default App;
