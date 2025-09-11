import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Minimize, Maximize } from "lucide-react";

const FarmerChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your farming assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Sample responses based on common farmer queries
  const botResponses = {
    greeting: "Hello! How can I assist with your farming needs today?",
    weather: "You can check the weather forecast for your region using our weather service. Would you like me to show you?",
    crops: "I can provide information about suitable crops for your soil type, planting seasons, and best practices. What specific crop are you interested in?",
    pests: "For pest identification and organic control methods, please describe the pest or upload a picture if possible.",
    soil: "Soil health is crucial! I can guide you on soil testing, amendments, and maintaining fertility. What specific issue are you facing?",
    irrigation: "Proper water management saves resources. I can advise on drip irrigation, scheduling, and water conservation techniques.",
    fertilizers: "I recommend organic fertilizers for sustainable farming. Would you like information on compost, green manure, or other organic options?",
    default: "I'm still learning about farming practices. Could you please provide more details about your query?",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      let response = botResponses.default;
      
      // Simple keyword matching for demo purposes
      const text = inputText.toLowerCase();
      if (text.includes("hello") || text.includes("hi")) response = botResponses.greeting;
      else if (text.includes("weather")) response = botResponses.weather;
      else if (text.includes("crop") || text.includes("plant")) response = botResponses.crops;
      else if (text.includes("pest") || text.includes("insect")) response = botResponses.pests;
      else if (text.includes("soil") || text.includes("dirt")) response = botResponses.soil;
      else if (text.includes("water") || text.includes("irrigation")) response = botResponses.irrigation;
      else if (text.includes("fertilizer") || text.includes("nutrient")) response = botResponses.fertilizers;

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Weather forecast?",
    "Crop recommendations",
    "Pest control advice",
    "Soil health tips"
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all animate-bounce"
        >
          <Bot size={28} />
        </button>
      )}

      {isOpen && (
        <div className={`w-80 bg-white rounded-lg shadow-xl overflow-hidden ${isMinimized ? 'h-14' : 'h-96'}`}>
          <div className="flex items-center justify-between p-3 bg-green-600 text-white">
            <div className="flex items-center">
              <Bot size={20} className="mr-2" />
              <h3 className="font-semibold">Farming Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-green-700 rounded"
              >
                {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-green-700 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="h-64 overflow-y-auto p-4 bg-green-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-green-100 text-green-900 rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-2 bg-green-100 border-t border-green-200">
                <p className="text-xs text-green-800 mb-1">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full hover:bg-green-300"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>


              <div className="flex items-center p-3 border-t border-green-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming..."
                  className="flex-1 p-2 border border-green-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerChatbot;