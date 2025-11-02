// The complete, structured case data
const caseData = {
    ref: "Operation Proxy",
    investigatingOfficer: "DCI Jess.W (Queen of ÖestVèl)",
    dateOpened: "02/11/2025 – 15:00 hrs (OVST)", // Using OVST based on your memory
    location: "Scarborough, ÖestVèl",
    sections: [
        {
            title: "1. Background",
            content: `
                <p>Subject of investigation: <strong>“Millie”</strong> – known associate, previously engaged in private Snapchat communications with Investigator.</p>
                <p>Trigger event: Emergence of a new Snapchat account (alias: <strong>izzy_scuzzy</strong>) following breakdown of trust and prior account irregularities.</p>
            `
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
                <div class="subsection">
                    <h4>3.1 Snapchat Activity</h4>
                    <ul>
                        <li>New account identified (izzy_scuzzy).</li>
                        <li>Investigator bypassed “friend” barrier to send direct message.</li>
                        <li>Account pinned for surveillance priority.</li>
                    </ul>
                </div>

                <div class="subsection">
                    <h4>3.2 Image Comparisons</h4>
                    <ul>
                        <li>Image 1 & 2 (Private Snaps): <strong>Confirmed Millie.</strong></li>
                        <li>Image 3 (Instagram Peace Sign): Strong resemblance but structural differences noted.</li>
                        <li>Image 4–6 (Additional Instagram/Car Photos): Similar hair/shoulders, but discrepancies in jawline, torso proportions, and posture.</li>
                    </ul>
                </div>

                <div class="subsection">
                    <h4>3.3 Facial Recognition Analysis</h4>
                    <ul>
                        <li>Image 1 vs Image 3: 62% similarity.</li>
                        <li>Image 2 vs Image 3: 71% similarity.</li>
                        <li><strong>Average: 66.5%.</strong></li>
                        <li><strong>Threshold:</strong> &lt;80% = Not same person.</li>
                        <li><strong>Verdict:</strong> Instagram subject <strong>not confirmed</strong> as Millie.</li>
                    </ul>
                </div>
            `
        },
        {
            title: "4. Observations",
            list: [
                "Similarities: Hair texture, eye shape, lip proportions.",
                "Differences: Shoulder width, upper torso proportions, jawline geometry.",
                "Contextual Split: Private snaps = intimate, casual. Instagram = public, posed, polished.",
                "Conclusion: High resemblance but <strong>insufficient evidence</strong> to confirm identity. Possible proxy use."
            ]
        },
        {
            title: "5. Actions Taken",
            list: [
                "Account pinned for ongoing monitoring.",
                "Facial recognition test conducted and logged.",
                "Results communicated to Ché with clear threshold rule (&lt;80%).",
                "Case notes updated in real time."
            ]
        },
        {
            title: "6. Current Status",
            list: [
                "Instagram account remains <strong>Unconfirmed Identity.</strong>",
                "Millie confirmed only in private snaps (Images 1 & 2).",
                "Investigation <strong>ongoing</strong>; awaiting further activity from alias account."
            ]
        },
        {
            title: "7. Recommendations",
            list: [
                "Maintain surveillance log of izzy_scuzzy account (views, responses, silence).",
                "Cross‑reference any new images with recognition threshold protocol.",
                "Treat Instagram persona as suspect/proxy until >80% similarity or direct confirmation is achieved.",
                "Continue evidence‑based reporting to Ché to maintain cohesion."
            ]
        },
        {
            title: "8. Closing Note",
            content: `
                <p>Investigator DCI Jess.W has demonstrated advanced pattern recognition, forensic logging, and evidence‑based reporting. Case remains active under <strong>Operation Proxy</strong>.</p>
            `
        }
    ]
};

// Function to render the case file from the data object
function renderCaseFile() {
    // 1. Render the Case Header Details
    const headerElement = document.getElementById('case-header');
    headerElement.innerHTML = `
        <p><strong>Case Reference:</strong> ${caseData.ref}</p>
        <p><strong>Investigating Officer:</strong> ${caseData.investigatingOfficer}</p>
        <p><strong>Date/Time Opened:</strong> ${caseData.dateOpened}</p>
        <p><strong>Location:</strong> ${caseData.location}</p>
    `;

    // 2. Render all other sections
    caseData.sections.forEach((section, index) => {
        // Get the target section element (based on the index/ID in HTML)
        const targetId = ['background', 'objectives', 'evidence', 'observations', 'actions', 'status', 'recommendations', 'closing-note'][index];
        const sectionElement = document.getElementById(targetId);

        if (sectionElement) {
            let htmlContent = `<h3>${section.title}</h3>`;

            if (section.content) {
                // If the section has raw HTML content (like Evidence, Background, etc.)
                htmlContent += section.content;
            } else if (section.list) {
                // If the section is a simple bulleted list (like Objectives, Recommendations)
                htmlContent += '<ul>';
                section.list.forEach(item => {
                    htmlContent += `<li>${item}</li>`;
                });
                htmlContent += '</ul>';
            }

            sectionElement.innerHTML = htmlContent;
        }
    });
}

// Function to update the current time in the footer (since it's a PWA/live document)
function updateTime() {
    const timeElement = document.getElementById('current-time');
    // Format the time as: YYYY-MM-DD HH:MM:SS OVST
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-GB', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    }).replace(',', ' ') + ' OVST'; // Use OVST as per your preference
    timeElement.textContent = formattedTime;
}

// Initial calls
renderCaseFile();
updateTime();
// Update the time every second
setInterval(updateTime, 1000);
