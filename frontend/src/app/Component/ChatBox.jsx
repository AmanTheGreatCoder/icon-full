"use client";
import Image from "next/image";
import { useState } from "react";

export default function ChatBox({ isMobileMenuOpen }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); // New animation state      

    const predefinedQuestions = [
        "What are your working hours?",
        "How can I contact support?",
        "What services do you offer?",
        "Can I schedule an appointment?",
        "Where are you located?",
    ];

    const handleSendMessage = (message) => {
        if (message.trim() !== "") {
            setMessages([...messages, { text: message, sender: "user" }]);
            setInput("");
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { text: "Hello! How can I help you?", sender: "bot" },
                ]);
            }, 1000);
        }
    };

    const handleToggleChat = () => {
        if (isChatOpen) {
            // Start closing animation             
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
                setIsChatOpen(false); // Fully close after animation             
            }, 500); // Match duration with CSS transition         
        } else {
            setIsChatOpen(true);
            setTimeout(() => setIsAnimating(true), 0); // Trigger opening animation         
        }
    };

    return (
        <div className="fixed sm:bottom-4 sm:right-4 top-0 right-0 z-40">
            {/* Background Overlay */}
            {isChatOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"
                        }`}
                ></div>
            )}

            {/* Chat Box */}
            {isChatOpen && (
                <div
                    className={`flex flex-col sm:w-96 w-full sm:h-[30rem] h-full fixed sm:bottom-[78px] bottom-0 right-0 sm:right-5 z-40 p-4 bg-gray-100 rounded-lg shadow-lg transform transition-transform duration-500 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                        }`}
                >
                    {/* Chat Header */}
                    <div className="flex justify-between items-center font-semibold text-black p-2 rounded-t-lg">
                        <h3>Chat</h3>
                        <button
                            onClick={handleToggleChat}
                            className="text-black text-xl"
                        >
                            ✖
                        </button>
                    </div>
                    {/* Predefined Questions */}
                    <div className="bg-gray-200 p-2 rounded-lg mb-4">
                        <p className="text-sm font-semibold mb-2">Quick Questions:</p>
                        <div className="flex flex-col space-y-2">
                            {predefinedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSendMessage(question)}
                                    className="text-left text-blue-600 hover:underline focus:outline-none"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto scrollbar-hidden bg-white p-4 rounded-lg shadow-inner h-64">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-2 my-2 rounded-lg ${message.sender === "user"
                                    ? "bg-blue-500 text-white self-end"
                                    : "bg-gray-200 text-black self-start"
                                    }`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    {/* Input Area */}
                    <div className="flex items-center mt-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        <button
                            onClick={() => handleSendMessage(input)}
                            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={handleToggleChat}
                className={`w-14 h-14 bg-white sm:z-50 z-30 text-2xl fixed ${isMobileMenuOpen ? "hidden" : "bottom-4"
                    } right-4 text-[#0A79C1] rounded-full shadow-[0px_2px_40px_0px_#4d4d4d85]
        focus:outline-none flex items-center justify-center`}
            >
                {isChatOpen ? (
                    "✖"
                ) : (
                    <Image
                        src="/assets/images/message.svg"
                        alt="message"
                        className="max-h-8"
                        height={40}
                        width={40}
                    />
                )}
            </button>
        </div>
    );
}
