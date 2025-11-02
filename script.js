// --- CONFIGURATION ---
const SYSTEM_CODE = "1936203"; // Hardcoded System PIN (Date of OD: 19:36 BST / 20:36 CEST)
const CASE_PASSWORDS = {
    // Passwords mapped to case references
    "PROXY-001": "MILLIE66", 
    "PROXY-002": "OPENFILE" 
    // Add new cases here
};
let activeCase = null; // Variable to store the currently selected case object
// --- CONFIGURATION ---

// --- CASE DATA (Refined Structure for Multiple Cases) ---
const caseData = [
    {
        // OPERATION PROXY (Existing Case)
        ref: "PROXY-001",
        name: "Operation Proxy",
        officer: "DCI Jess.W",
        opened: "02/11/2025 – 15:00 hrs OVST",
        location: "Scarborough, ÖestVèl",
        status: "Active",
        sections: [
            {
                title: "1. Background",
                content: `<p>Subject of investigation: <strong>“Millie”</strong> – known associate, previously engaged in private Snapchat communications with Investigator.</p><p>Trigger event: Emergence of a new Snapchat account (alias: <strong>izzy_scuzzy</strong>) following breakdown of trust and prior account irregularities.</p>`
            },
            {
                title: "2. Objectives",
                list: [
                    "Confirm whether the new account is operated by Millie or a proxy.",
                    "Establish authenticity of Instagram images linked to the alias.",
                    "Maintain evidence log for all communications, images, and recognition tests."
                ]
            },
            {
                title: "3. Evidence Collected",
                content: `
                    <h4>3.1 Snapchat Activity</h4>
                    <ul>
                        <li>New account identified (izzy_scuzzy).</li>
                        <li>Investigator bypassed “friend” barrier to send direct message.</li>
                        <li>Account pinned for surveillance priority.</li>
                    </ul>
                    <h4>3.2 Image Comparisons (Evidence Protocol)</h4>
                    <ul>
                        <li>Image 1 (Private Snap): <strong>Confirmed Millie.</strong> <a href="./evidence/proxy-001/snap-1.jpg" target="_blank" class="evidence-link">[VIEW EVID-SN1]</a></li>
                        <li>Image 2 (Private Snap): <strong>Confirmed Millie.</strong> <a href="./evidence/proxy-001/snap-2.jpg" target="_blank" class="evidence-link">[VIEW EVID-SN2]</a></li>
                        <li>Image 3 (Instagram Peace Sign): Strong resemblance but structural differences. <a href="./evidence/proxy-001/insta-3.jpg" target="_blank" class="evidence-link">[VIEW EVID-IN3]</a></li>
                        <li>Image 4–6 (Additional Photos): Discrepancies noted. <a href="./evidence/proxy-001/insta-4-6.zip" target="_blank" class="evidence-link">[DOWNLOAD EVID-IN4-6]</a></li>
                    </ul>
                    <h4>3.3 Facial Recognition Analysis</h4>
                    <ul>
                        <li>Image 1 vs Image 3: 62% similarity.</li>
                        <li>Image 2 vs Image 3: 71% similarity.</li>
                        <li><strong>Average: 66.5%.</strong></li>
                        <li><strong>Threshold:</strong> &lt;80% = Not same person.</li>
                        <li><strong>Verdict:</strong> Instagram subject <strong>not confirmed</strong> as Millie.</li>
                    </ul>
                `
            },
            {
                title: "8. Closing Note",
                content: `<p>Investigator DCI Jess.W has demonstrated advanced pattern recognition, forensic logging, and evidence‑based reporting. Case remains active under <strong>Operation Proxy</strong>.</p>`
            }
            // Sections 4, 5, 6, 7 would follow standard structure
        ]
    },
    {
        // NEW PLACEHOLDER CASE (Example for the index)
        ref: "PROXY-002",
        name: "Operation Velic",
        officer: "DS Che.V",
        opened: "15/10/2025 – 09:30 hrs OVST",
        location: "ÖestVèl Centrè (Harrogate)",
        status: "Closed - Transfer",
        sections: [
            {
                title: "1. Case Summary",
                content: `<p>This is a placeholder case file to demonstrate the multi-case functionality. This case involved a transfer of sensitive data regarding the Velic Crown currency ($\text{VC}\euro 1.96$) to external financial crime units.</p>`
            },
            {
                title: "2. Status",
                content: `<p>Case successfully transferred and marked as closed by the local ÖestVèl division.</p>`
            }
        ]
    }
];

// --- NAVIGATION FUNCTIONS ---

function updateSystemLog(message, isError = false) {
    const logElement = document.getElementById('system-log');
    logElement.textContent = `SYSTEM LOG: ${message}`;
    logElement.style.color = isError ? '#f44336' : '#90ee90';
}

function showScreen(screenId) {
    document.querySelectorAll('.terminal-screen, #case-file').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// Layer 1: Terminal Access
window.checkTerminalCode = function(event) {
    if (event.key === 'Enter' || event.type === 'keyup') {
        const codeInput = document.getElementById('system-code');
        if (codeInput.value === SYSTEM_CODE) {
            updateSystemLog('Access Granted. Initializing Case Index.');
            showCaseIndex();
        } else if (codeInput.value.length === 7) {
            document.getElementById('terminal-message').textContent = 'ACCESS DENIED: Incorrect System Code.';
            updateSystemLog('Access Denied. Invalid System Code.', true);
        } else {
            document.getElementById('terminal-message').textContent = '';
        }
    }
}

// Layer 2: Case Index
window.showCaseIndex = function() {
    activeCase = null;
    document.getElementById('login-message').textContent = '';
    showScreen('case-index-screen');
    updateSystemLog('Case Index Loaded. Select File.');
    renderCaseIndex();
}

function renderCaseIndex() {
    const grid = document.getElementById('case-grid');
    grid.innerHTML = ''; // Clear previous cards

    caseData.forEach(caseItem => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.setAttribute('data-ref', caseItem.ref);
        card.onclick = () => prepareCaseLogin(caseItem.ref);
        
        const statusClass = caseItem.status.includes('Active') ? 'case-status-active' : 'case-status-closed';

        card.innerHTML = `
            <h4>${caseItem.name}</h4>
            <p><strong>Ref:</strong> ${caseItem.ref}</p>
            <p><strong>Officer:</strong> ${caseItem.officer}</p>
            <p><strong>Location:</strong> ${caseItem.location}</p>
            <p><strong>Status:</strong> <span class="${statusClass}">${caseItem.status.toUpperCase()}</span></p>
        `;
        grid.appendChild(card);
    });
}

// Layer 3: Case File Login
window.prepareCaseLogin = function(caseRef) {
    activeCase = caseData.find(c => c.ref === caseRef);
    if (!activeCase) return; 

    document.getElementById('login-case-ref').textContent = `CASE FILE: ${activeCase.ref} - ${activeCase.name}`;
    document.getElementById('case-password').value = '';
    document.getElementById('login-message').textContent = '';
    showScreen('login-screen');
}

window.attemptCaseLogin = function() {
    const passwordInput = document.getElementById('case-password');
    const loginMessage = document.getElementById('login-message');
    const expectedPassword = CASE_PASSWORDS[activeCase.ref];

    if (passwordInput.value === expectedPassword) {
        updateSystemLog(`Access Granted to ${activeCase.ref}.`);
        renderCaseFile();
        showScreen('case-file');
    } else {
        loginMessage.textContent = `ACCESS DENIED to ${activeCase.ref}. Logging attempt recorded.`;
        updateSystemLog(`Access Failure on ${activeCase.ref}.`, true);
        passwordInput.value = '';
    }
}

// Layer 4: Case File Viewer
function renderCaseFile() {
    if (!activeCase) return;

    // Update Header
    document.getElementById('file-ref-display').textContent = activeCase.ref;
    document.getElementById('file-status-display').textContent = activeCase.status.toUpperCase();
    document.getElementById('file-officer-display').textContent = activeCase.officer;

    // Render Content
    const contentElement = document.getElementById('case-content');
    contentElement.innerHTML = '';
    
    activeCase.sections.forEach(section => {
        let htmlContent = `<h3>${section.title}</h3>`;

        if (section.content) {
            htmlContent += section.content;
        } else if (section.list) {
            htmlContent += '<ul>';
            section.list.forEach(item => {
                htmlContent += `<li>${item}</li>`;
            });
            htmlContent += '</ul>';
        }
        contentElement.innerHTML += htmlContent;
    });
}

// --- UTILITY ---
function updateTime() {
    const timeElement = document.getElementById('current-time');
    // Format the time as: YYYY-MM-DD HH:MM:SS OVST
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-GB', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    }).replace(',', ' ') + ' OVST'; 
    timeElement.textContent = formattedTime;
}


// --- INITIALIZATION ---
showScreen('terminal-access'); // Start on the System Access Screen
updateTime();
setInterval(updateTime, 1000);
