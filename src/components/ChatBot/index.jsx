import React, { useState, useRef, useMemo, useEffect } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { PiTextAlignJustify } from "react-icons/pi";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";

const farmer_questions = [
    "इस मौसम में उगाने के लिए सबसे अच्छी फसलें",
    "गेहूं में कीटों से बचाव के तरीके",
    "धान की सिंचाई के सर्वोत्तम तरीके",
    "मिट्टी की जांच कैसे करें?",
    "सब्जियों की उर्वरक की सही मात्रा कितनी होनी चाहिए?",
    "फलदार पौधों की देखभाल के टिप्स",
    "सस्ते और प्रभावी कीट नियंत्रण के उपाय",
    "सूखी मिट्टी में फसल उगाने के तरीके",
    "बुवाई के लिए आदर्श समय कौन सा है?",
    "फसल में पोषण की कमी कैसे पहचानें?",
    "बाजार में फसल बेचने के सर्वोत्तम तरीके",
    "जैविक खाद बनाने के सरल तरीके",
    "खेती में पानी की बचत के उपाय",
    "कृषि मशीनरी का सही इस्तेमाल कैसे करें?",
    "धान की उचित कटाई का समय",
    "फसल के रोगों का जल्दी पता लगाने के संकेत",
    "बीज बोने से पहले मिट्टी की तैयारी कैसे करें?",
    "नमी और तापमान के अनुसार सिंचाई की योजना",
    "जैविक कीट नियंत्रण के प्रभावी तरीके",
    "फसल के लिए उपयुक्त उर्वरक का चुनाव",
    "अनाज की भंडारण और सुरक्षा के तरीके",
    "सूखा या बाढ़ के समय फसल सुरक्षा उपाय",
    "मौसमी फसल विविधता बढ़ाने के सुझाव",
    "कृषि बीमा लेने की प्रक्रिया और लाभ"
];


const ChatBot = () => {
    const user_id = "random_user1";
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [val, setValue] = useState(0); // Changed to number for simplicity

    const [input, setInput] = useState("");
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);

    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);
    const messagesEndRef = useRef(null);

    

    const randomQuestions = useMemo(() => {
        const shuffled = [...farmer_questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionIds = await all_session_of_user(user_id);

                if (sessionIds.length > 0) {

                    const formattedSessions = sessionIds.map((sessionId, index) => ({
                        id: sessionId,
                        title: sessionId.replace(`${user_id}_`, ""),
                        active: index === 0
                    }));

                    setSessions(formattedSessions);
                    setActiveSessionId(formattedSessions[0].id);
                } else {
                    const defaultSession = {
                        id: `${user_id}_default`,
                        title: "सामान्य_चर्चा",
                        active: true
                    };
                    setSessions([defaultSession]);
                    setActiveSessionId(defaultSession.id);
                }
            } catch (error) {
                console.error("Error fetching sessions for user:", error);
                const defaultSession = {
                    id: `${user_id}_default`,
                    title: "सामान्य_चर्चा",
                    active: true
                };
                setSessions([defaultSession]);
                setActiveSessionId(defaultSession.id);
            }
        };

        fetchSessions();
    }, [val]);

    useEffect(() => {
        const fetchConversationHistory = async () => {
            const currentSession = sessions.find(s => s.id === activeSessionId);
            
            if (currentSession && currentSession.title !== "नया_सत्र") {
                try {
                    // Use the full session ID for the API call
                    const history = await conversation_of_current_session(currentSession.id);
                    setConversations(history);
                } catch (error) {
                    console.error("Error fetching conversation history:", error);
                    setConversations([]);
                }
            } else {
                setConversations([]);
            }
        };

        if (activeSessionId) {
            fetchConversationHistory();
        }
    }, [activeSessionId, sessions]);

    const startListening = () => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            alert("Your browser does not support voice input");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "hi-IN";
        recognitionRef.current.interimResults = true;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onstart = () => setListening(true);
        recognitionRef.current.onresult = (event) => setInput(event.results[0][0].transcript);
        recognitionRef.current.onend = () => setListening(false);
        recognitionRef.current.start();
    };

    const selectSession = (id) => {
        setActiveSessionId(id);
        setSessions(prevSessions =>
            prevSessions.map(session => ({ ...session, active: session.id === id }))
        );
    };

    const createNewSession = () => {
        const newSessionId = `${user_id}_session_${Date.now()}`;
        const newSession = {
            id: newSessionId,
            title: "नया_सत्र",
            active: true,
        };

        setSessions(prevSessions => [
            newSession,
            ...prevSessions.map(session => ({ ...session, active: false })),
        ]);
        setActiveSessionId(newSessionId);
        setConversations([]);
    };

    function formatMarkdown(text) {
        if (!text) return "";
        const rawHtml = marked.parse(text, { breaks: true });
        return DOMPurify.sanitize(rawHtml);
    }

    const conversation_of_current_session = async (session_id) => {
        try {
            const res = await axios.get(`https://kisan-mitra-chatbot-2.onrender.com/farmer_query/session/${session_id}/history`);
            return res.data;
        } catch (err) {
            console.error("Error fetching conversation:", err);
            return [];
        }
    };

    const all_session_of_user = async (user_id) => {
        try {
            const res = await axios.get(`https://kisan-mitra-chatbot-2.onrender.com/farmer_query/allSession_user/${user_id}`);
            return res.data;
        } catch (err) {
            console.error("Error fetching session for the user:", err);
            return [];
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !activeSessionId) return;

        const userMessage = {
            type: "human",
            content: input,
            timestamp: new Date().toISOString()
        };

        const messageToSend = input;
        setConversations(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        const currentSession = sessions.find(s => s.id === activeSessionId);
        const isNewSession = currentSession.title === "नया_सत्र";

        try {
            const response = await axios.post("https://kisan-mitra-chatbot-2.onrender.com/farmer_query/chat", {
                user_id: user_id,
                message: messageToSend,
                session_id: isNewSession ? `${user_id}_${messageToSend}` : currentSession.id
            });

            // **FIX APPLIED HERE**
            if (isNewSession) {
                // Instead of refetching all sessions, just update the title of the new session.
                const newSessionIdFromServer = `${user_id}_${messageToSend}`;
                setSessions(prevSessions =>
                    prevSessions.map(session =>
                        session.id === activeSessionId
                            ? { ...session, title: messageToSend, id: newSessionIdFromServer }
                            : session
                    )
                );
                // Also update the active session ID to match the permanent ID from the server
                setActiveSessionId(newSessionIdFromServer);
            }

            const botMessage = {
                type: "bot",
                content: formatMarkdown(response.data.response || "कोई उत्तर उपलब्ध नहीं है।"),
                timestamp: new Date().toISOString()
            };

            setConversations(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling backend API:", error);
            const errorMessage = {
                type: "bot",
                content: "सर्वर से उत्तर प्राप्त नहीं हो सका।",
                timestamp: new Date().toISOString()
            };
            setConversations(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-gray-800 text-white overflow-hidden flex flex-col`}>
                <div className="p-4 flex items-center justify-between border-b border-gray-700">
                    <h2 className="text-xl font-semibold">Sessions</h2>
                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-full hover:bg-gray-700">
                        &#10005;
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    <button
                        onClick={createNewSession}
                        className="flex items-center justify-center gap-2 w-full mt-4 p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition text-white mb-5"
                    >
                        <FaRegPlusSquare /> <span>New Session</span>
                    </button>
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            onClick={() => selectSession(session.id)}
                            className={`p-3 rounded-lg mb-2 cursor-pointer transition ${session.active ? "bg-gray-600" : "hover:bg-gray-700"}`}
                        >
                            <p className="text-sm truncate">{session.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 overflow-y-auto no-scrollbar">
                    {conversations.length === 0 && !loading ? (
                        <>
                            <div className="my-8 text-center">
                                <p className="text-4xl font-bold text-gray-800">
                                    नमस्ते किसान भाई
                                </p>
                                <p className="text-lg text-gray-600 mt-2">
                                    मैं आपकी खेती के लिए मार्गदर्शन प्रदान कर सकता हूं
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                                {randomQuestions.map((question, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setInput(question)}
                                        className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-all cursor-pointer border border-gray-200 hover:-translate-y-1"
                                    >
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                                <img src="/compass_icon.png" alt="question" className="w-6 h-6" />
                                            </div>
                                            <p className="text-gray-800 font-medium text-base">
                                                {question}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            {conversations.map((message, index) => (
                                message.type === "human" || message.role === "human" ? (
                                    <div key={index} className="flex justify-end items-end gap-3">
                                        <div className="bg-blue-500 text-white px-4 py-3 rounded-2xl shadow max-w-[80%]">
                                            <p className="text-base">{message.content}</p>
                                        </div>
                                        <img src="/user.jpg" alt="user" className="w-10 h-10 rounded-full border-2 border-gray-300" />
                                    </div>
                                ) : (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 shadow">
                                            <img src="/gemini_icon.png" alt="bot" className="w-6 h-6" />
                                        </div>
                                        <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl shadow max-w-[80%] border border-gray-200">
                                            <div className="text-base leading-relaxed prose" dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }} />
                                        </div>
                                    </div>
                                )
                            ))}

                            {loading && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 shadow">
                                        <img src="/gemini_icon.png" alt="bot" className="w-6 h-6" />
                                    </div>
                                    <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl shadow max-w-[80%] border border-gray-200">
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded-full animate-pulse w-full"></div>
                                            <div className="h-4 bg-gray-200 rounded-full animate-pulse w-5/6"></div>
                                            <div className="h-4 bg-gray-200 rounded-full animate-pulse w-4/6"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl mx-auto px-4 mb-6">
                    {!sidebarOpen && (
                        <button 
                            onClick={() => setSidebarOpen(true)} 
                            className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-200"
                        >
                            <PiTextAlignJustify size={24} />
                        </button>
                    )}
                    <div className="flex items-center gap-4 bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="अपना प्रश्न यहाँ लिखें..."
                            className="flex-1 bg-transparent border-none outline-none text-gray-800 text-lg placeholder-gray-500"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <div className="flex items-center gap-3">
                            <button
                                onClick={startListening}
                                className={`p-3 rounded-full transition ${listening ? "bg-gray-300" : "hover:bg-gray-100"}`}
                            >
                                <img src="/mic_icon.png" alt="आवाज" className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                <img src="/send_icon.png" alt="भेजें" className="w-6 h-6 invert" />
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-center text-gray-500 mt-4">
                        कृपया ध्यान दें: यह चैटबॉट केवल कृषि संबंधित मार्गदर्शन देता है। कृपया अपने क्षेत्रीय कृषि विशेषज्ञ से भी सलाह लें।
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;