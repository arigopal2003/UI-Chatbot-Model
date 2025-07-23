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
            "hi": "Hi! I'm Seyasoft virtual assistant. How can I help you today?",
            "hello": "Hello! How can I assist you at Seyasoft?",
            "bye": "Goodbye! Have a productive day!",
            "thanks": "You're welcome! If you need anything else, just ask.",
            "services": "We offer Web Development, Mobile Apps, AI Solutions, ERP, CRM and more.",
            "products": "Our flagship products include AI-powered CRM, HRMS, and Invoice Suite.",
            "ai": "Our AI solutions include chatbots, image recognition, sentiment analysis, and more.",
            "machine learning": "We provide supervised/unsupervised ML models for prediction and automation.",
            "school software": "Our education suite includes attendance, fee tracking, timetable and LMS.",
            "lms": "Our Learning Management System helps teachers, students, and admins manage online classes.",
            "e-commerce": "Seyasoft builds scalable, mobile-friendly e-commerce websites with cart, checkout, and payment.",
            "web app": "We create interactive web apps with Angular, React, and Django.",
            "mobile app": "We develop Android and iOS apps using Flutter, React Native, or native code.",
            "devops": "We support CI/CD pipelines, cloud monitoring, Docker, Kubernetes, and GitOps.",
            "seo": "We help improve your website visibility with technical and on-page SEO.",
            "portfolio": "See our work: www.seyasoftech.com/portfolio",
            "about": getSeyasoftAbout(),
            "contact": getContactInfo(),
            "careers": "We're hiring! Send your resume to careers@seyasoftech.com or check www.seyasoftech.com/careers",
            "support": "For support, email us at support@seyasoftech.com or call +91 9345910713",
            "quote": "Request a free quote at www.seyasoftech.com/quote or email us."
        },
        categories: {
            "web design": {
                "title": "🎨 Web Design",
                "description": "We create stunning UI/UX websites tailored to your brand.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/web-design.php"
            },
            "web development": {
                "title": "🌐 Web Development",
                "description": "We build secure, responsive and SEO-friendly web apps.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/web-development.php"
            },
            "mobile application": {
                "title": "📱 Mobile Apps",
                "description": "Cross-platform and native mobile apps for all industries.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/moblie-app-development.php"
            },
            "digital marketing": {
                "title": "📢 Digital Marketing",
                "description": "Boost your online presence with our comprehensive marketing strategies.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/digital-marketing.php"
            },
            "software development": {
                "title": "💻 Software Development",
                "description": "Custom software solutions tailored to your business needs.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/software-development.php"
            },
            "artificial intelligence": {
                "title": "🤖 Artificial Intelligence",
                "description": "AI-powered solutions to transform your business operations.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/artificial-intelligence.php"
            },
            "creative services": {
                "title": "🎭 Creative Services",
                "description": "Professional design and branding services for your business.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/creative-services.php"
            },
            "digital transformation": {
                "title": "🚀 Digital Transformation",
                "description": "Modernize your business with our cutting-edge digital solutions.",
                "button": "Learn More",
                "link": "https://seyasoftnew.seyasoftech.com/digital-transformation.php"
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
        return `**Seyasoft Technologies**  \nWe provide full-stack development, AI-driven apps, CRM/ERP, cloud hosting and industry-grade solutions. Based in Chennai.\n\nMore at: [seyasoftech.com](https://seyasoftnew.seyasoftech.com/)`;
    }

    function getContactInfo() {
        return `**Contact Seyasoft**\n\n📧 enquiry@seyasoftech.com\n📞 +91 9345910713\n📍 Chennai, India\n[Visit Site](https://seyasoftnew.seyasoftech.com/)`;
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