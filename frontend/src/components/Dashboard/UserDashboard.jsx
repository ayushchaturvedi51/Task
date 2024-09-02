import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";

function UserDashboard() {
    const [username, setUsername] = useState("John Doe");
    const [marketplaceItems, setMarketplaceItems] = useState([
        { id: 1, name: "Item 1", price: 10 },
        { id: 2, name: "Item 2", price: 20 },
        { id: 3, name: "Item 3", price: 15 },
    ]);

    useEffect(() => {
        // Fetch user data (for demonstration, using hardcoded username)
        // In a real-world scenario, you would fetch this from an API
        setUsername("John Doe");
    }, []);

    const handleBuy = (itemId) => {
        // console.log(Buying item with id: ${itemId});
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <FiUser className="w-8 h-8 text-white mr-3" />
                    <span className="text-xl font-semibold">{username}</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#" className="hover:text-gray-300">
                                Marketplace
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Marketplace */}
            <main className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Marketplace</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketplaceItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600">Price: {item.price} XP</p>
                            </div>
                            <button
                                onClick={() => handleBuy(item.id)}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
                            >
                                Buy
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default UserDashboard;