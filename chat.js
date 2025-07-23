document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".chat-container");
    const chatToggleBtn = document.getElementById("open-chat");
    const closeChatBtn = document.getElementById("close-chat");
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const categoryButtons = document.querySelectorAll(".category-btn");

    const chatbotConfig = {
        responses: {
            
        },
        categories: {
            "web design": {
                "title": "🎨 Web Design",
                "description": "We create stunning UI/UX websites tailored to your brand.",
                "button": "Learn More",
                "link": 
            },
            "web development": {
                "title": "🌐 Web Development",
                "description": "We build secure, responsive and SEO-friendly web apps.",
                "button": "Learn More",
                "link":
            },
            "mobile application": {
                "title": "📱 Mobile Apps",
                "description": "Cross-platform and native mobile apps for all industries.",
                "button": "Learn More",
                "link": 
            },
            "digital marketing": {
                "title": "📢 Digital Marketing",
                "description": "Boost your online presence with our comprehensive marketing strategies.",
                "button": "Learn More",
                "link": 
            },
            "software development": {
                "title": "💻 Software Development",
                "description": "Custom software solutions tailored to your business needs.",
                "button": "Learn More",
                "link": 
            },
            "artificial intelligence": {
                "title": "🤖 Artificial Intelligence",
                "description": "AI-powered solutions to transform your business operations.",
                "button": "Learn More",
                "link": 
            },
            "creative services": {
                "title": "🎭 Creative Services",
                "description": "Professional design and branding services for your business.",
                "button": "Learn More",
                "link": 
            },
            "digital transformation": {
                "title": "🚀 Digital Transformation",
                "description": "Modernize your business with our cutting-edge digital solutions.",
                "button": "Learn More",
                "link": 
            }
        }
    };

    // HTML for category buttons (add this to your HTML file)
    /*
    <div class="category-buttons">
        <button class="category-btn" data-message="web design">Web Design</button>
        <button class="category-btn" data-message="web development">Web Development</button>
        <button class="category-btn" data-message="mobile application">Mobile Apps</button>
        <button class="category-btn" data-message="digital marketing">Digital Marketing</button>
        <button class="category-btn" data-message="software development">Software Dev</button>
        <button class="category-btn" data-message="artificial intelligence">AI Solutions</button>
        <button class="category-btn" data-message="creative services">Creative Services</button>
        <button class="category-btn" data-message="digital transformation">Digital Transformation</button>
    </div>
    */

    function toggleChat(show) {
        chatContainer.style.display = show ? "flex" : "none";
        chatToggleBtn.style.display = show ? "none" : "block";
    }

    function processUserMessage(message) {
        const cleanMsg = message.toLowerCase().trim();
        if (chatbotConfig.responses[cleanMsg]) {
            return chatbotConfig.responses[cleanMsg];
        }
        for (const [keyword, details] of Object.entries(chatbotConfig.categories)) {
            if (cleanMsg.includes(keyword)) {
                return formatCategoryResponse(details);
            }
        }
        for (const [keyword, response] of Object.entries(chatbotConfig.responses)) {
            if (cleanMsg.includes(keyword)) {
                return response;
            }
        }
        return "I'm sorry, I didn't understand that. You can ask about our services, contact, pricing, or support.";
    }

    function getSeyasoftAbout() {
        return `**Technologies**  \nWe provide full-stack development, AI-driven apps, CRM/ERP, cloud hosting and industry-grade solutions. Based in Chennai.\n\nMore at: [.com](https://.com/)`;
    }

    function getContactInfo() {
        return `**Contact**\n\n📧 enquiry@.com\n📞 +91 \n📍 Chennai, India\n[Visit Site](https:///)`;
    }

    function formatCategoryResponse(category) {
        return `**${category.title}**  \n${category.description}  \n[${category.button}](${category.link})`;
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = sender === 'bot' ? marked.parse(text) : text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.id = "typing-indicator";
        typingDiv.className = "message bot-message typing";
        typingDiv.textContent = "Typing...";
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatToggleBtn.addEventListener("click", () => toggleChat(true));
    closeChatBtn.addEventListener("click", () => toggleChat(false));
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => sendMessage(btn.dataset.message));
    });

    function sendMessage(predefinedMsg) {
        const message = predefinedMsg || userInput.value.trim();
        if (!message) return;
        appendMessage('user', message);
        if (!predefinedMsg) userInput.value = '';
        showTypingIndicator();
        setTimeout(() => {
            document.getElementById("typing-indicator")?.remove();
            const response = processUserMessage(message);
            appendMessage('bot', response);
        }, 800);
    }

    setTimeout(() => {
        appendMessage('bot', "Hello! I'm the Seyasoft assistant. How can I help you today?");
    }, 1000);
});
