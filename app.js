// --- APP STATE ---
const state = {
    user: {
        name: '',
        email: '',
        lat: null,
        lng: null,
        address: ''
    },
    chat: {
        active: false,
        step: 0,
        score: 0
    },
    quiz: {
        scores: { A: 0, B: 0, C: 0, D: 0 },
        currentQuestionIndex: 0
    }
};

// --- CONSTANTS ---
const MOTIVATIONAL_MSGS = [
    "ขอให้วันนี้เป็นวันที่ดีของคุณนะ 😊",
    "ไม่ว่าวันนี้จะเจออะไร คุณเก่งมากแล้วที่ผ่านมันมาได้ ✌️",
    "พักผ่อนบ้างนะ อย่าลืมใจดีกับตัวเอง 💖",
    "ท้องฟ้าวันนี้ยังสวยงามเสมอนะ 🌤️",
    "ทุกปัญหามีทางออก ค่อยๆ ก้าวไปทีละก้าวนะ 🌸"
];

// Chat questions based on สสส.
const CHAT_QUESTIONS = [
    "สวัสดีครับ 😊 ผมคือ Ai Psychology นะ ช่วงนี้เป็นอย่างไรบ้างครับ วันนี้เจอเรื่องกวนใจอะไรมาไหม เล่าให้ฟังได้นะ?", 
    "ช่วงสัปดาห์ที่ผ่านมานี้ คุณนอนหลับสบายดีไหมครับ มีอาการตื่นกลางดึกหรือนอนไม่พอติดๆ กันหรือเปล่า?",
    "แล้วช่วงนี้คุณยังสนุกกับงานอดิเรกหรือสิ่งที่เคยชอบทำอยู่ไหม หรือรู้สึกเบื่อๆ ไม่อยากทำอะไรเลย?",
    "บางครั้งคนเราก็มีวันที่รู้สึกหมดไฟ... ช่วงนี้คุณมีอารมณ์ดิ่งๆ เศร้าๆ หรืออึดอัดใจบ่อยไหมครับ?",
    "แล้วร่างกายของคุณเป็นยังไงบ้าง รู้สึกอ่อนเพลีย ไม่มีแรงเหมือนแบตหมดเร็วเกินไปบ้างไหม?",
    "เรื่องอาหารการกินล่ะครับ ทานได้ปกติไหม หรือว่ารู้สึกเบื่ออาหาร (หรือแอบกินเยอะขึ้นตอนเครียด?)",
    "เวลาที่อยู่คนเดียว เคยมีความคิดแง่ลบกับตัวเองไหมครับ เช่น รู้สึกว่าทำอะไรก็ไม่ดี...",
    "ช่วงนี้เวลาทำงานหรือเรียน สมาธิยังดีอยู่ไหมครับ หรือเผลอเหม่อลอย หลุดโฟกัสบ่อยๆ ไหม?",
    "บางทีเวลาเหนื่อยมากๆ... คุณเคยมีความคิดอยากหลับไปยาวๆ หรือทำร้ายตัวเองบ้างไหมครับ? (บอกผมได้ตรงๆ เลยนะ)",
    "โดยรวมแล้ว ช่วงนี้ในชีวิตประจำวันของคุณ คุณคิดว่าความเครียดสะสมของคุณอยู่ในระดับไหนครับ?"
];

const QUIZ_STEPS = [
    { type: 'story', bg: 'assets/cover.png' },
    { type: 'story', bg: 'assets/warning.png' },
    { type: 'story', bg: 'assets/story1.png' },
    { type: 'story', bg: 'assets/story2.png' },
    { 
        type: 'question', 
        bg: 'assets/q1.png',
        options: [
            { text: "แสงแดดที่ลอดผ่านม่านเมฆ", value: "A" },
            { text: "ความเงียบสงบของหุบเหวเบื้องล่าง", value: "B" },
            { text: "เข็มทิศเหล็กที่วางอยู่ข้างตัว", value: "C" },
            { text: "แผนที่ล่องหนที่ค่อยๆ ปรากฏสีสัน", value: "D" }
        ]
    },
    { 
        type: 'question', bg: 'assets/q2.png',
        options: [
            { text: "นั่งลงข้าง ๆ และให้ขนมหรือสัมผัสที่อบอุ่น", value: "A" },
            { text: "เว้นระยะห่างและเปิดเพลงเบา ๆ ให้ฟังเงียบ ๆ", value: "B" },
            { text: "ถามหาสาเหตุและช่วยเสนอวิธีการแก้ปัญหาให้", value: "C" },
            { text: "ชวนไปทำอะไรสนุก ๆ และพาไปชมวิวท้องฟ้า", value: "D" }
        ]
    },
    { 
        type: 'question', bg: 'assets/q3.png',
        options: [
            { text: "การถูกทอดทิ้งให้อยู่คนเดียว", value: "A" },
            { text: "เสียงฝีเท้าที่คอยตามติดและวุ่นวาย", value: "B" },
            { text: "ความล้มเหลวที่แก้ไขไม่ได้", value: "C" },
            { text: "โลกที่ทุกอย่างเหมือนกันหมดและไม่มีสีสัน", value: "D" }
        ]
    },
    { 
        type: 'question', bg: 'assets/q4.png',
        options: [
            { text: "มิตรภาพและความเชื่อใจ", value: "A" },
            { text: "ความสงบและการปล่อยวาง", value: "B" },
            { text: "ความจริงและความถูกต้อง", value: "C" },
            { text: "ความฝันและแรงบันดาลใจ", value: "D" }
        ]
    },
    { type: 'story', bg: 'assets/story3.png' },
    { 
        type: 'question', bg: 'assets/q5.png',
        options: [
            { text: "ปลอบโยนลูกเรือคนอื่นและช่วยกันกางแผงกั้น", value: "A" },
            { text: "หลับตาลงและฟังเสียงลมเพื่อหาจุดที่เงียบที่สุด", value: "B" },
            { text: "บังคับหางเสือด้วยตนเองและฝ่าไปตามแผน", value: "C" },
            { text: "ใช้เวทมนตร์เปลี่ยนสายฟ้าให้เป็นดอกไม้ไฟ", value: "D" }
        ]
    },
    { 
        type: 'question', bg: 'assets/q6.png',
        options: [
            { text: "โอบกอดคนที่คุณรักในสวนที่เบ่งบาน", value: "A" },
            { text: "นั่งสมาธิอยู่บนยอดเขาที่ไม่มีใครรบกวน", value: "B" },
            { text: "ยืนอยู่บนหอคอยสูงมองดูเมืองที่เป็นระเบียบ", value: "C" },
            { text: "ร่ายรำและสร้างสรรค์สิ่งใหม่ ๆ", value: "D" }
        ]
    },
    { type: 'story', bg: 'assets/story4.png' },
    { 
        type: 'question', bg: 'assets/q7.png',
        options: [
            { text: "ผู้พิทักษ์ที่มาพร้อมรอยยิ้มและกิ่งไม้ผลิใบ", value: "A" },
            { text: "ผู้พิทักษ์ที่มาพร้อมผ้าคลุมสีเทาและตาที่สงบนิ่ง", value: "B" },
            { text: "ผู้พิทักษ์ที่มาพร้อมชุดเกราะสีเงินและดาบ", value: "C" },
            { text: "ผู้พิทักษ์ที่มาพร้อมพู่กันสีรุ้งและเสียงหัวเราะ", value: "D" }
        ]
    },
    { type: 'story', bg: 'assets/story5.png' }
];

const QUIZ_RESULTS = {
    A: {
        name: "เกาะพฤกษาแห่งแสง",
        bgUrl: "assets/result_A.png",
        engName: "Flora of Light Island",
        title: "ผู้พิทักษ์รอยยิ้มและแสงตะวัน",
        color: "var(--island-a)",
        icon: "🌱",
        desc: "พลังงานบวกของคุณทำให้คนรอบข้างอุ่นใจ คุณสามารถเปลี่ยนเรื่องลบให้กลายเป็นรอยยิ้มได้เสมอ",
        item: "ตะเกียงแก้วจรัสแสง",
        motto: "คุณคือผู้ที่ทำให้คนรอบข้างเบ่งบานเสมอ แม้ในวันที่ท้องฟ้ามืดมิด ใจของคุณก็ยังคงเป็นแสงสว่างที่อบอุ่นที่สุด"
    },
    B: {
        name: "เกาะหุบเขาแห่งเมฆา",
        bgUrl: "assets/result_B.png",
        engName: "Valley of Cloud Island",
        title: "ผู้เยียวยาด้วยความสงบ",
        color: "var(--island-b)",
        icon: "☁️",
        desc: "คุณคือพื้นที่ปลอดภัยสำหรับทุกคน คุณมีความรอบคอบ ใจเย็น และรับฟังผู้อื่นอย่างลึกซึ้ง",
        item: "ขลุ่ยสายลม",
        motto: "ความสงบในใจคุณคือพลังที่ยิ่งใหญ่ที่สุด ไม่ว่าจะเจอพายุใหญ่แค่ไหน คุณก็จะสามารถพาทั้งตัวเองและคนรอบข้างผ่านมันไปได้อย่างมั่นคง"
    },
    C: {
        name: "เกาะศิลาไร้กาลเวลา",
        bgUrl: "assets/result_C.png",
        engName: "Timeless Rock Island",
        title: "ปราชญ์ผู้ถือครองความจริง",
        color: "var(--island-c)",
        icon: "⛰️",
        desc: "คุณเป็นเสาหลักที่พึ่งพาได้เสมอ มีความมั่นคง เด็ดเดี่ยว และใช้เหตุผลนำทางชีวิตได้ดีเยี่ยม",
        item: "นาฬิกาทรายนิรันดร์",
        motto: "โลกอาจจะหมุนไปข้างหน้าอย่างรวดเร็ว แต่คุณคือคนเดียวที่ทำให้ทุกย่างก้าวของชีวิตยังมีความหมายและมั่นคง"
    },
    D: {
        name: "เกาะไอศูรย์รังสรรค์",
        bgUrl: "assets/result_D.png",
        engName: "Isun Rangsan Island",
        title: "สถาปนิกแห่งจินตนาการ",
        color: "var(--island-d)",
        icon: "✨",
        desc: "คุณมีสีสันที่โลกขาดไม่ได้ รักความแตกต่าง และมีจินตนาการเปลี่ยนเรื่องธรรมดาให้น่าสนใจ",
        item: "พู่กันดาริกา",
        motto: "จงปล่อยให้จินตนาการของคุณโบยบินไปให้สุดขอบฟ้า เพราะโลกนี้ขับเคลื่อนได้ด้วยคนที่กล้าฝันแบบคุณ"
    }
};

// --- INIT & ROUTING ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginState();
    setupEventListeners();
});

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId + '-view').classList.add('active');
    
    if (viewId === 'dashboard') initDashboard();
    if (viewId === 'map') initMap();
}

function checkLoginState() {
    const saved = localStorage.getItem('lifeCareData');
    if (saved) {
        state.user = JSON.parse(saved);
        switchView('dashboard');
    } else {
        switchView('intro');
    }
}

function setupEventListeners() {
    // Intro
    document.getElementById('intro-clickable-area').addEventListener('click', () => {
        switchView('login');
    });

    // Login Form
    document.getElementById('btn-get-location').addEventListener('click', requestLocation);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Dashboard actions
    document.getElementById('btn-logout').addEventListener('click', handleLogout);
    document.getElementById('btn-go-chat').addEventListener('click', () => {
        switchView('chat');
        startChatSession();
    });
    document.getElementById('btn-go-island-quiz').addEventListener('click', () => {
        switchView('quiz');
        startQuiz();
    });
    document.getElementById('btn-go-map').addEventListener('click', () => {
        switchView('map');
    });

    // Chat actions
    document.getElementById('btn-send-message').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendChatMessage();
    });
}

// --- LOGIN & GEOLOCATION ---
async function requestLocation() {
    const locStatus = document.getElementById('location-status');
    locStatus.textContent = "กำลังค้นหาตำแหน่ง...";
    locStatus.className = "status-msg";

    if (!navigator.geolocation) {
        locStatus.textContent = "เบราว์เซอร์ไม่รองรับ GPS";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        state.user.lat = pos.coords.latitude;
        state.user.lng = pos.coords.longitude;
        
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${state.user.lat}&lon=${state.user.lng}`);
            const data = await res.json();
            state.user.address = data.display_name;
            locStatus.textContent = "📍 พบตำแหน่งของคุณแล้ว!";
            locStatus.className = "status-msg status-success";
            document.getElementById('btn-get-location').classList.add('btn-primary');
            document.getElementById('btn-get-location').classList.remove('btn-outline');
        } catch(e) {
            state.user.address = `พิกัด Lat: ${state.user.lat}, Lng: ${state.user.lng}`;
            locStatus.textContent = "📍 ทราบพิกัดแล้ว";
            locStatus.className = "status-msg status-success";
        }
    }, () => {
        locStatus.textContent = "❌ กรุณาอนุญาตตำแหน่งที่ตั้ง";
        locStatus.className = "status-msg status-error";
    });
}

function handleLogin(e) {
    e.preventDefault();
    const em = document.getElementById('email').value;
    const nm = document.getElementById('fullName').value;
    
    if (!state.user.lat) {
        alert("กรุณาอนุญาตตำแหน่งที่ตั้ง เพื่อให้สามารถค้นหาสถานพยาบาลได้ครับ");
        return;
    }

    state.user.email = em;
    state.user.name = nm;
    localStorage.setItem('lifeCareData', JSON.stringify(state.user));
    switchView('dashboard');
}

function handleLogout() {
    localStorage.removeItem('lifeCareData');
    switchView('intro');
}

// --- DASHBOARD ---
function initDashboard() {
    document.getElementById('display-name').textContent = state.user.name;
    document.getElementById('display-address').textContent = state.user.address;

    // Random Message logic ensure no immediate repeat
    let lastMsg = parseInt(localStorage.getItem('lcLastMsg') || -1);
    let newMsg = Math.floor(Math.random() * MOTIVATIONAL_MSGS.length);
    while (newMsg === lastMsg && MOTIVATIONAL_MSGS.length > 1) {
        newMsg = Math.floor(Math.random() * MOTIVATIONAL_MSGS.length);
    }
    localStorage.setItem('lcLastMsg', newMsg);
    document.getElementById('encouragement-text').textContent = MOTIVATIONAL_MSGS[newMsg];

    // Read chat assessment score if any
    const latestScore = localStorage.getItem('lcLatestScore');
    const badge = document.getElementById('display-status');
    if (latestScore !== null) {
        const sc = parseInt(latestScore);
        if (sc > 10) {
            badge.textContent = "มีความเครียดสูง (แนะนำพบแพทย์)";
            badge.className = "status-badge status-risk";
        } else {
            badge.textContent = "ระดับปกติ (สุขภาพจิตดี)";
            badge.className = "status-badge status-normal";
        }
    } else {
        badge.textContent = "ยังไม่มีการประเมิน";
        badge.className = "status-badge status-none";
    }
}

// --- AI CHATBOT (Simulated) ---
const chatMessages = document.getElementById('chat-messages');

function startChatSession() {
    state.chat.step = 0;
    state.chat.score = 0;
    state.chat.active = true;
    chatMessages.innerHTML = '';
    
    document.getElementById('chat-input').disabled = false;
    document.getElementById('btn-send-message').disabled = false;
    
    // Welcome message and first question
    sendBotMessage(CHAT_QUESTIONS[0]);
}

function sendBotMessage(msg, withOptions = true) {
    showTyping();
    setTimeout(() => {
        removeTyping();
        appendChatBubble(msg, 'bot');
        
        if (withOptions && state.chat.step > 0 && state.chat.step < CHAT_QUESTIONS.length) {
            renderChatOptions();
        }
    }, 1000);
}

function appendChatBubble(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble bubble-${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const tDiv = document.createElement('div');
    tDiv.className = 'chat-bubble bubble-bot typing';
    tDiv.innerHTML = '<span></span><span></span><span></span>';
    tDiv.id = 'typing-indicator';
    chatMessages.appendChild(tDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if(t) t.remove();
}

function renderChatOptions() {
    const container = document.createElement('div');
    container.className = 'quick-replies';
    
    const opts = [
        { text: "ไม่มีเลย", s: 0 },
        { text: "เป็นบางวัน", s: 1 },
        { text: "บ่อยครั้ง", s: 2 },
        { text: "เป็นทุกวัน", s: 3 }
    ];
    
    opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = opt.text;
        btn.onclick = () => {
            container.remove();
            handleUserChoice(opt.text, opt.s);
        };
        container.appendChild(btn);
    });
    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserChoice(text, scoreAdded) {
    appendChatBubble(text, 'user');
    state.chat.score += scoreAdded;
    progressChat();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    document.querySelectorAll('.quick-replies').forEach(e => e.remove());
    
    appendChatBubble(text, 'user');
    // random generic score 1 for typing generic text instead of buttons
    state.chat.score += 1; 
    progressChat();
}

function progressChat() {
    state.chat.step++;
    if (state.chat.step < CHAT_QUESTIONS.length) {
        sendBotMessage(CHAT_QUESTIONS[state.chat.step]);
    } else {
        // Evaluate
        document.getElementById('chat-input').disabled = true;
        document.getElementById('btn-send-message').disabled = true;
        
        localStorage.setItem('lcLatestScore', state.chat.score);
        
        showTyping();
        setTimeout(() => {
            removeTyping();
            if (state.chat.score > 10) {
                appendChatBubble("จากข้อมูลที่คุณตอบมา ดูเหมือนช่วงนี้คุณจะมีความเครียดสะสมค่อนข้างมากเลยครับ... ผมขอแนะนำให้ลองค้นหาสถานพยาบาลใกล้เคียงหรือใช้สายด่วน 1323 เพื่อคุยกับผู้เชี่ยวชาญเพิ่มเติมเพื่อความสบายใจนะครับ 🫂", 'bot');
            } else {
                appendChatBubble("สุขภาพจิตใจคุณช่วงนี้ยังแข็งแรงและปกติดีมากครับ เยี่ยมไปเลย! ดูแลตัวเองและหาความสุขให้ตัวเองเสมอๆ นะครับ 😊", 'bot');
            }
        }, 1500);
    }
}

// --- ISLAND QUIZ ---
function startQuiz() {
    state.quiz.scores = { A: 0, B: 0, C: 0, D: 0 };
    state.quiz.currentQuestionIndex = 0; // step index now
    renderQuizStep();
}

function renderQuizStep() {
    const stepData = QUIZ_STEPS[state.quiz.currentQuestionIndex];
    const quizBg = document.getElementById('quiz-bg');
    const overlay = document.getElementById('quiz-overlay-buttons');
    
    // Create a beautiful fallback gradient based on step index
    const gradients = [
        "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
        "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
        "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)"
    ];
    const fallBackGradient = gradients[state.quiz.currentQuestionIndex % gradients.length];
    
    // If the image fails to load, the gradient below it will be shown beautifully
    quizBg.style.backgroundImage = `url('${stepData.bg}'), ${fallBackGradient}`;
    quizBg.style.backgroundSize = "cover";
    quizBg.style.backgroundPosition = "center";
    quizBg.style.backgroundColor = 'transparent'; 
    
    overlay.innerHTML = '';
    
    if (stepData.type === 'question') {
        stepData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'transparent-btn';
            // btn.textContent = opt.text; // Text hidden as we rely on Canva's graphics
            btn.onclick = () => handleQuizNext(opt.value);
            overlay.appendChild(btn);
        });
    } else {
        // Story slide: full screen invisible button so any touch advances the page
        const btn = document.createElement('button');
        btn.className = 'transparent-btn';
        btn.style.width = '100%';
        btn.style.height = '100%';
        btn.style.position = 'absolute';
        btn.style.top = '0';
        btn.style.left = '0';
        // btn.textContent = "แตะเพื่อไปต่อ (Next) >>"; // Text hidden
        btn.onclick = () => handleQuizNext(null);
        overlay.appendChild(btn);
    }
}

function handleQuizNext(valueStr) {
    if (valueStr) {
        state.quiz.scores[valueStr] += 1;
    }
    
    state.quiz.currentQuestionIndex++;
    
    if (state.quiz.currentQuestionIndex < QUIZ_STEPS.length) {
        renderQuizStep();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    let winner = 'A';
    let maxSc = state.quiz.scores.A;
    
    // Logic: If tie, the earlier one wins (e.g. A vs B tie -> A wins because B needs strictly > A to overtake)
    if (state.quiz.scores.B > maxSc) { winner = 'B'; maxSc = state.quiz.scores.B; }
    if (state.quiz.scores.C > maxSc) { winner = 'C'; maxSc = state.quiz.scores.C; }
    if (state.quiz.scores.D > maxSc) { winner = 'D'; maxSc = state.quiz.scores.D; }
    
    const res = QUIZ_RESULTS[winner];    
    
    // Set exact image background to fully display Canva without blocking text block
    document.getElementById('result-bg').style.backgroundImage = `url('${res.bgUrl}')`;
    switchView('result');
}

// --- LEAFLET MAP ---
let mapInstance = null;

async function initMap() {
    if (!state.user.lat) return; // Failsafe
    
    if (mapInstance) {
        // Invalidate and re-center if map exists
        mapInstance.invalidateSize();
        mapInstance.setView([state.user.lat, state.user.lng], 13);
        return;
    }

    mapInstance = L.map('hospital-map').setView([state.user.lat, state.user.lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    // Add user marker
    L.marker([state.user.lat, state.user.lng]).addTo(mapInstance)
        .bindPopup('📍 ตำแหน่งปัจจุบันของคุณ')
        .openPopup();

    // Custom Icon for hospital
    var hospIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    try {
        // Find amenities within 5km via Overpass API
        const query = `[out:json];(node["amenity"="hospital"](around:5000,${state.user.lat},${state.user.lng});node["amenity"="clinic"](around:5000,${state.user.lat},${state.user.lng}););out;`;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.elements) {
            data.elements.forEach(place => {
                const hName = place.tags && place.tags.name ? place.tags.name : "สถานพยาบาล/คลินิก";
                L.marker([place.lat, place.lon], {icon: hospIcon}).addTo(mapInstance)
                    .bindPopup(`🏥 <b>${hName}</b>`);
            });
        }
    } catch (err) {
        console.error("Failed to load overlay map:", err);
    }
}
