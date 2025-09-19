import React, { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaMicrophone, FaStopCircle } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

const Chatbot1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [userId] = useState(() => {
    const storedId = localStorage.getItem('kisanMitraUserId');
    if (storedId) return storedId;

    const newId = `user_${Date.now()}`;
    localStorage.setItem('kisanMitraUserId', newId);
    return newId;
  });

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Context data (English + Hindi)
  const contextData = [
    "KisanMitra is an AI-powered agricultural assistant designed to support farmers with better decisions, higher productivity, and improved income. It brings together crop recommendations, yield predictions, weather insights, soil and disease analysis, farming guidance, and market awareness into a single platform accessible in regional languages.",
    "किसानमित्र एक एआई-संचालित कृषि सहायक है जिसे किसानों को बेहतर निर्णय लेने, उत्पादकता बढ़ाने और आय में सुधार करने में मदद करने के लिए बनाया गया है। यह फसल अनुशंसा, उपज पूर्वानुमान, मौसम जानकारी, मिट्टी और रोग विश्लेषण, खेती मार्गदर्शन और बाजार जागरूकता जैसी सुविधाओं को एक ही मंच पर क्षेत्रीय भाषाओं में उपलब्ध कराता है.",

    "Primary goal: help small-scale farmers increase productivity by at least 10% by combining historical data, weather patterns, soil health, and best practices to deliver personalized, actionable recommendations for irrigation, fertilization, and pest control.",
    "मुख्य उद्देश्य: छोटे किसानों की उत्पादकता को कम से कम 10% बढ़ाना। इसके लिए ऐतिहासिक डेटा, मौसम पैटर्न, मिट्टी की स्थिति और सर्वोत्तम कृषि पद्धतियों को मिलाकर सिंचाई, उर्वरक और कीट नियंत्रण के लिए व्यक्तिगत, व्यवहारिक सुझाव दिए जाते हैं.",

    "Crop Recommendation: the farmer provides soil details (nutrient levels like N, P, K, pH, organic matter), land size, irrigation type, sowing date, and preferences. The system suggests the best crops to grow, with a suitability score, risks, seed and fertilizer guidance, expected timeline, and economic outcome.",
    "फसल अनुशंसा: किसान अपनी मिट्टी का विवरण (पोषक स्तर जैसे N, P, K, pH, जैविक पदार्थ), भूमि का आकार, सिंचाई का प्रकार, बुवाई की तिथि और प्राथमिकताएँ दर्ज करता है। सिस्टम सर्वोत्तम फसलें सुझाता है, उपयुक्तता स्कोर, जोखिम, बीज व उर्वरक सुझाव, अपेक्षित समयरेखा और आर्थिक परिणाम बताता है.",

    "Yield Prediction: the farmer enters details such as location, year, land area, soil and climate conditions (rainfall, temperature), and pesticide use. The system predicts crop yield, explains main factors, highlights risks, and suggests interventions with cost–benefit estimates.",
    "उपज पूर्वानुमान: किसान स्थान, वर्ष, भूमि क्षेत्र, मिट्टी व जलवायु स्थिति (वर्षा, तापमान), और कीटनाशक उपयोग दर्ज करता है। सिस्टम फसल उपज का अनुमान देता है, मुख्य कारण समझाता है, जोखिम बताता है और लागत-लाभ अनुमान के साथ सुधारात्मक उपाय सुझाता है.",

    "Weather Analysis: provides today's weather, a 7-day forecast, and past data for any location. Future upgrades include alerts, regional updates, and agri-related news.",
    "मौसम विश्लेषण: आज का मौसम, 7-दिन का पूर्वानुमान और पिछले दिनों का डेटा किसी भी स्थान के लिए उपलब्ध है। भविष्य में इसमें अलर्ट, क्षेत्रीय अपडेट और कृषि-संबंधी समाचार जोड़े जाएंगे.",

    "Soil Health Check: farmers can either enter soil test values or (future) upload soil images. Output includes soil health score, deficiencies, fertilizer/amendment advice, and easy-to-understand steps for improvement.",
    "मिट्टी स्वास्थ्य जांच: किसान या तो मिट्टी की जांच मान दर्ज कर सकते हैं या (भविष्य में) मिट्टी की छवियाँ अपलोड कर सकेंगे। आउटपुट में मिट्टी स्वास्थ्य स्कोर, कमी की पहचान, उर्वरक/संशोधन सलाह और सुधार के आसान उपाय शामिल हैं.",

    "Crop Disease Prediction (planned): farmers upload plant/leaf images to identify possible diseases, severity, and remedies (organic and chemical). Severe cases prompt referral to local experts.",
    "फसल रोग पूर्वानुमान (योजना): किसान पौधों/पत्तियों की तस्वीर अपलोड कर सकेंगे जिससे संभावित रोग, गंभीरता और उपचार (जैविक व रासायनिक) का पता चलेगा। गंभीर मामलों में स्थानीय विशेषज्ञों से परामर्श की सलाह दी जाएगी.",

    "Organic Farming Guide: provides crop-specific organic practices such as soil preparation, organic fertilizers, natural pest control, compost methods, and seasonal steps in regional languages.",
    "जैविक खेती मार्गदर्शिका: फसल-विशिष्ट जैविक पद्धतियाँ जैसे मिट्टी की तैयारी, जैविक उर्वरक, प्राकृतिक कीट नियंत्रण, खाद बनाने की विधियाँ और मौसमी चरण क्षेत्रीय भाषाओं में उपलब्ध कराती है.",

    "Marketplace: shows mandi and local market prices for farm inputs and outputs, helping farmers find best deals and maximize profits.",
    "बाज़ार जानकारी: मंडी और स्थानीय बाजारों के इनपुट व आउटपुट के दाम दिखाती है, जिससे किसान सबसे अच्छे दाम पा सकें और अधिक लाभ कमा सकें.",

    "Smart Agricultural Farming (future): IoT sensors for soil moisture, nutrients, and drones for crop monitoring will provide real-time precision recommendations.",
    "स्मार्ट कृषि (भविष्य): मिट्टी की नमी, पोषक तत्वों के लिए IoT सेंसर और फसल निगरानी के लिए ड्रोन किसानों को वास्तविक समय परिशुद्ध अनुशंसा देंगे.",

    "AI Chatbot: virtual farming advisor supporting Hindi/English text and voice. Remembers conversations, builds personalized summaries, and answers queries using system knowledge.",
    "एआई चैटबॉट: आभासी कृषि सलाहकार, जो हिंदी/अंग्रेज़ी में टेक्स्ट और आवाज़ समर्थन करता है। बातचीत याद रखता है, व्यक्तिगत सारांश बनाता है और सिस्टम जानकारी का उपयोग करके सवालों के जवाब देता है.",

    "Crop Calendar: shows month-wise sowing and harvesting times for different crops with filters for region, soil, or season.",
    "फसल कैलेंडर: विभिन्न फसलों की महीनेवार बुवाई और कटाई का समय दिखाता है, जिसमें क्षेत्र, मिट्टी या मौसम के आधार पर फ़िल्टर करने की सुविधा है.",

    "AI Crop Guidance: provides end-to-end guidance for selected crops – from sowing to harvesting, covering irrigation, fertilization, and disease prevention.",
    "एआई फसल मार्गदर्शन: चुनी गई फसल के लिए बुवाई से कटाई तक पूरी मार्गदर्शिका देता है, जिसमें सिंचाई, उर्वरीकरण और रोग रोकथाम शामिल हैं.",

    "Government Schemes: highlights state and central government programs relevant to the farmer's crop and region, with simple summaries and application links.",
    "सरकारी योजनाएँ: राज्य और केंद्र सरकार की योजनाओं को किसान की फसल और क्षेत्र के अनुसार दिखाता है, आसान भाषा में सारांश और आवेदन लिंक के साथ.",

    "Dashboard & Insights: personalized farmer dashboard showing crop recs, yield predictions, weather, soil, prices, disease alerts, and schemes in one place. Farmers can also download reports.",
    "डैशबोर्ड और अंतर्दृष्टि: व्यक्तिगत किसान डैशबोर्ड जो फसल अनुशंसा, उपज अनुमान, मौसम, मिट्टी, दाम, रोग चेतावनी और योजनाएँ एक ही जगह दिखाता है। किसान रिपोर्ट भी डाउनलोड कर सकते हैं.",

    "Notifications & Feedback: timely alerts about weather, risks, and markets plus a feedback system for farmers to share experience and improve the platform.",
    "सूचनाएँ और प्रतिक्रिया: मौसम, जोखिम और बाजार के बारे में समय पर अलर्ट और किसानों के अनुभव साझा करने व मंच सुधारने के लिए प्रतिक्रिया प्रणाली.",

    "Transparency & Trust: predictions are explained clearly, risks are highlighted, and when uncertain the system suggests next steps (like contacting an agriculture officer or soil lab).",
    "पारदर्शिता और विश्वास: पूर्वानुमानों को स्पष्ट रूप से समझाया जाता है, जोखिमों को उजागर किया जाता है और संदेह की स्थिति में सिस्टम अगले कदम (जैसे कृषि अधिकारी या मिट्टी प्रयोगशाला से संपर्क) सुझाता है.",

    "Example queries in Hindi: 'इस मौसम में सबसे अच्छी फसलें कौन सी हैं?', 'गोरखपुर में इस साल धान की उपज कितनी होगी?', 'मेरे खेत के लिए 7-दिन की सिंचाई योजना बताओ', 'गेहूं में कीटों से बचाव के तरीके क्या हैं?', 'ओडिशा में धान किसानों के लिए सरकारी योजनाएँ कौन सी हैं?', 'नजदीकी मंडियों में मक्का की कीमतें बताओ।'",
    "Example queries in English: 'Recommend crops for soil N=150, P=40, K=30 and pH 6.5', 'Predict rice yield for Odisha 2025 given 1 acre under drip irrigation', '7-day weather and irrigation plan for my village', 'Organic methods to control pests in wheat', 'List government schemes for paddy farmers in Odisha', 'Compare maize prices across nearby mandis'.",

    "In summary: KisanMitra is a one-stop farmer's companion that delivers crop advice, yield predictions, weather insights, soil and disease analysis, organic guidance, market awareness, and government scheme information – all personalized, easy to understand, and accessible in regional languages.",
    "सारांश: किसानमित्र एक सर्व-समावेशी किसान साथी है जो फसल सलाह, उपज पूर्वानुमान, मौसम जानकारी, मिट्टी और रोग विश्लेषण, जैविक मार्गदर्शन, बाजार जागरूकता और सरकारी योजनाओं की जानकारी प्रदान करता है – सब कुछ व्यक्तिगत, आसान और क्षेत्रीय भाषाओं में उपलब्ध."
  ];

  // Initialize Google Gemini
  const genAI = new GoogleGenerativeAI("AIzaSyBwqgQer7NvDHzS8ye4LkTlFVKWmaz_sL0");

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN'; // Default Hindi

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Find relevant context
  const findRelevantContext = (query) => {
    const queryLower = query.toLowerCase();
    const scoredContext = [];
    contextData.forEach((item) => {
      let score = 0;
      const itemLower = item.toLowerCase();
      if (itemLower.includes(queryLower)) score += 10;
      const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);
      queryWords.forEach(word => {
        if (itemLower.includes(word)) score += 3;
      });
      if (score > 0) scoredContext.push({ text: item, score });
    });
    return scoredContext
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.text);
  };

  // Corrected RAG pipeline
  const ragPipeline = async (query) => {
    setIsLoading(true);
    try {
      const relevantContext = findRelevantContext(query);
      if (relevantContext.length === 0) {
        return ["माफ़ कीजिए, मेरे पास इस विषय पर जानकारी नहीं है।"];
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        You are KisanMitra, an AI assistant for farmers.
        Use ONLY the following context to answer. 
        Provide up to 3 different helpful options if possible.
        Label them clearly as "Option 1", "Option 2", etc.

        Context:
        ${relevantContext.join("\n\n")}

        User Question: ${query}

        Answer:
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Split into multiple answers if Options are present
      const answers = response
        .split(/Option\s*\d+[:\-]*/i)
        .map(ans => ans.trim())
        .filter(ans => ans.length > 0);

      return answers.length ? answers : [response];
    } catch (error) {
      console.error("Error in RAG pipeline:", error);
      return ["माफ़ कीजिए, मुझे इस समय आपके प्रश्न का उत्तर देने में कठिनाई हो रही है।"];
    } finally {
      setIsLoading(false);
    }
  };

  // Voice input toggle
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Speak the response
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    // Get multiple responses
    const responses = await ragPipeline(currentInput);

    responses.forEach((resp, i) => {
      const botMessage = {
        id: Date.now() + i + 1,
        text: resp,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);

      // Speak only first response for Hindi queries
      if (i === 0 && (
        currentInput.match(/[\u0900-\u097F]/) ||
        currentInput.toLowerCase().includes('hindi')
      )) {
        speakResponse(resp);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-interface">
          <div className="chatbot-header">
            <h3>किसान मित्र सहायता</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>नमस्ते! मैं किसान मित्र एप्लिकेशन की सहायता के लिए यहाँ हूँ।</p>
                <p>आप फसल सिफारिश, मौसम विश्लेषण, मिट्टी स्वास्थ्य, या बाजार मूल्यों के बारे में पूछ सकते हैं।</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <button
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
            >
              {isListening ? <FaStopCircle /> : <FaMicrophone />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="अपना प्रश्न पूछें..."
              disabled={isLoading}
            />

            <button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button className="chatbot-icon" onClick={() => setIsOpen(true)}>
          <FaComment />
          <span className="pulse-ring"></span>
        </button>
      )}
    </div>
  );
};

export default Chatbot1;
