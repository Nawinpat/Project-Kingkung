// Basketball Team Randomizer Application
// Main application class
class BasketballTeamRandomizer {
    constructor() {
        this.players = [];
        this.selectedTeamSize = null;
        this.teams = [];
        this.currentLanguage = 'en';
        this.languages = {
            en: {
                appTitle: 'Basketball Team Randomizer',
                predefinedPlayersTitle: 'Select Players',
                playerInputTitle: 'Manual Player Input',
                addBtnText: 'Add',
                playerCountText: 'Players: ',
                playerListTitle: 'Current Players',
                noPlayersText: 'No players added yet',
                teamSizeTitle: 'Team Size Selection',
                selectedSizeText: 'Selected Team Size: ',
                teamCountText: 'Number of Teams: ',
                extraPlayersText: 'Extra Players: ',
                randomizeText: 'Randomize Teams',
                resetText: 'Reset',
                resultsTitle: 'Team Results',
                saveText: 'Save Results',
                copyText: 'Copy to Clipboard',
                langText: 'EN',
                // Notifications
                playerAdded: 'Player added successfully!',
                playerRemoved: 'Player removed successfully!',
                playerSelected: 'Player selected!',
                playerDeselected: 'Player deselected!',
                duplicatePlayer: 'Player name already exists!',
                emptyName: 'Please enter a player name!',
                insufficientPlayers: 'Insufficient players for selected team size!',
                teamsRandomized: 'Teams randomized successfully!',
                resultsSaved: 'Results saved successfully!',
                resultsCopied: 'Results copied to clipboard!',
                resetConfirmed: 'All data has been reset!',
                warningInsufficient: 'Warning: Insufficient players for selected team size!',
                warningOddPlayers: 'Note: One team will have an extra player due to odd number of players.',
                warningUnevenTeams: 'Note: Will create uneven teams (e.g., 3v2, 4v3)'
            },
            th: {
                appTitle: 'เครื่องสุ่มทีมบาสคิงคัง',
                predefinedPlayersTitle: 'เลือกคิงคัง',
                playerInputTitle: 'เพิ่มผู้เล่นด้วยตนเอง',
                addBtnText: 'เพิ่ม',
                playerCountText: 'ผู้เล่น: ',
                playerListTitle: 'ผู้เล่นปัจจุบัน',
                noPlayersText: 'ยังไม่มีผู้เล่น',
                teamSizeTitle: 'เลือกขนาดทีม',
                selectedSizeText: 'ขนาดทีมที่เลือก: ',
                teamCountText: 'จำนวนทีม: ',
                extraPlayersText: 'ผู้เล่นเพิ่ม: ',
                randomizeText: 'สุ่มทีม',
                resetText: 'รีเซ็ต',
                resultsTitle: 'ผลการสุ่มทีม',
                saveText: 'บันทึกผลลัพธ์',
                copyText: 'คัดลอกไปยังคลิปบอร์ด',
                langText: 'TH',
                // Notifications
                playerAdded: 'เพิ่มผู้เล่นสำเร็จ!',
                playerRemoved: 'ลบผู้เล่นสำเร็จ!',
                playerSelected: 'เลือกผู้เล่นแล้ว!',
                playerDeselected: 'ยกเลิกการเลือกผู้เล่นแล้ว!',
                duplicatePlayer: 'ชื่อผู้เล่นซ้ำ!',
                emptyName: 'กรุณาใส่ชื่อผู้เล่น!',
                insufficientPlayers: 'ผู้เล่นไม่เพียงพอสำหรับขนาดทีมที่เลือก!',
                teamsRandomized: 'สุ่มทีมสำเร็จ!',
                resultsSaved: 'บันทึกผลลัพธ์สำเร็จ!',
                resultsCopied: 'คัดลอกผลลัพธ์ไปยังคลิปบอร์ดสำเร็จ!',
                resetConfirmed: 'รีเซ็ตข้อมูลทั้งหมดแล้ว!',
                warningInsufficient: 'คำเตือน: ผู้เล่นไม่เพียงพอสำหรับขนาดทีมที่เลือก!',
                warningOddPlayers: 'หมายเหตุ: ทีมหนึ่งจะมีผู้เล่นเพิ่มเนื่องจากจำนวนผู้เล่นเป็นเลขคี่',
                warningUnevenTeams: 'หมายเหตุ: จะสร้างทีมที่ไม่เท่ากัน (เช่น 3v2, 4v3)'
            }
        };
        
        this.init();
    }

    // Initialize the application
    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.updateUI();
        this.updateLanguage();
    }

    // Set up all event listeners
    setupEventListeners() {
        // Predefined player selection
        document.querySelectorAll('.select-player-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.togglePlayerSelection(e.target.closest('.player-card').dataset.player);
            });
        });

        // Player input
        document.getElementById('add-player-btn').addEventListener('click', () => this.addPlayer());
        document.getElementById('player-name-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPlayer();
        });

        // Team size selection
        document.querySelectorAll('.team-size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTeamSize(parseInt(e.target.dataset.size)));
        });

        // Action buttons
        document.getElementById('randomize-btn').addEventListener('click', () => this.randomizeTeams());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());

        // Results actions
        document.getElementById('save-btn').addEventListener('click', () => this.saveResults());
        document.getElementById('copy-btn').addEventListener('click', () => this.copyResults());

        // Language toggle
        document.getElementById('lang-toggle').addEventListener('click', () => this.toggleLanguage());
    }

    // Toggle predefined player selection
    togglePlayerSelection(playerName) {
        const playerCard = document.querySelector(`[data-player="${playerName}"]`);
        const isSelected = this.players.includes(playerName);

        if (isSelected) {
            // Remove player
            this.players = this.players.filter(player => player !== playerName);
            playerCard.classList.remove('selected');
            this.showNotification(this.languages[this.currentLanguage].playerDeselected, 'info');
        } else {
            // Add player
            if (this.players.length >= 12) {
                this.showNotification('Maximum 12 players allowed!', 'error');
                return;
            }
            this.players.push(playerName);
            playerCard.classList.add('selected');
            this.showNotification(this.languages[this.currentLanguage].playerSelected, 'success');
        }

        this.updateUI();
        this.saveToLocalStorage();
    }

    // Add a player to the list (manual input)
    addPlayer() {
        const input = document.getElementById('player-name-input');
        const name = input.value.trim();

        if (!name) {
            this.showNotification(this.languages[this.currentLanguage].emptyName, 'error');
            return;
        }

        if (this.players.includes(name)) {
            this.showNotification(this.languages[this.currentLanguage].duplicatePlayer, 'error');
            return;
        }

        if (this.players.length >= 12) {
            this.showNotification('Maximum 12 players allowed!', 'error');
            return;
        }

        this.players.push(name);
        input.value = '';
        this.updateUI();
        this.saveToLocalStorage();
        this.showNotification(this.languages[this.currentLanguage].playerAdded, 'success');
    }

    // Remove a player from the list
    removePlayer(name) {
        this.players = this.players.filter(player => player !== name);
        
        // Update predefined player card if it exists
        const playerCard = document.querySelector(`[data-player="${name}"]`);
        if (playerCard) {
            playerCard.classList.remove('selected');
        }
        
        this.updateUI();
        this.saveToLocalStorage();
        this.showNotification(this.languages[this.currentLanguage].playerRemoved, 'success');
    }

    // Select team size
    selectTeamSize(size) {
        this.selectedTeamSize = size;
        
        // Update button states
        document.querySelectorAll('.team-size-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (parseInt(btn.dataset.size) === size) {
                btn.classList.add('selected');
            }
        });

        this.updateTeamInfo();
        this.updateRandomizeButton();
    }

    // Update team information display
    updateTeamInfo() {
        if (!this.selectedTeamSize) {
            document.getElementById('selected-size').textContent = '-';
            document.getElementById('team-count').textContent = '-';
            document.getElementById('extra-players').textContent = '-';
            return;
        }

        const playerCount = this.players.length;
        let teamCount, extraPlayers;

        if (playerCount >= this.selectedTeamSize * 2) {
            // Standard formation
            teamCount = Math.ceil(playerCount / this.selectedTeamSize);
            extraPlayers = playerCount % this.selectedTeamSize;
        } else {
            // Uneven teams (2 teams)
            teamCount = 2;
            extraPlayers = playerCount % 2; // Will be 0 for even, 1 for odd
        }

        document.getElementById('selected-size').textContent = this.selectedTeamSize;
        document.getElementById('team-count').textContent = teamCount;
        document.getElementById('extra-players').textContent = extraPlayers || 0;

        // Show warnings
        this.showWarnings(playerCount, this.selectedTeamSize);
    }

    // Show appropriate warnings
    showWarnings(playerCount, teamSize) {
        const warningElement = document.getElementById('warning-message');
        warningElement.classList.add('hidden');

        if (playerCount < teamSize) {
            warningElement.textContent = this.languages[this.currentLanguage].warningInsufficient;
            warningElement.classList.remove('hidden', 'error');
            warningElement.classList.add('error');
        } else if (playerCount < teamSize * 2) {
            warningElement.textContent = this.languages[this.currentLanguage].warningUnevenTeams;
            warningElement.classList.remove('hidden', 'error');
        } else if (playerCount % teamSize !== 0) {
            warningElement.textContent = this.languages[this.currentLanguage].warningOddPlayers;
            warningElement.classList.remove('hidden', 'error');
        }
    }

    // Update randomize button state
    updateRandomizeButton() {
        const randomizeBtn = document.getElementById('randomize-btn');
        const canRandomize = this.players.length >= 4 && this.selectedTeamSize && 
                           this.players.length >= this.selectedTeamSize;
        
        randomizeBtn.disabled = !canRandomize;
    }

    // Randomize teams
    randomizeTeams() {
        if (!this.selectedTeamSize || this.players.length < this.selectedTeamSize) {
            this.showNotification(this.languages[this.currentLanguage].insufficientPlayers, 'error');
            return;
        }

        // Create a copy of players array and shuffle it
        const shuffledPlayers = [...this.players];
        this.shuffleArray(shuffledPlayers);

        // Smart team formation logic
        this.teams = this.createSmartTeams(shuffledPlayers, this.selectedTeamSize);

        this.displayResults();
        this.showNotification(this.languages[this.currentLanguage].teamsRandomized, 'success');
    }

    // Create smart teams with flexible formation
    createSmartTeams(players, targetTeamSize) {
        const teams = [];
        const playerCount = players.length;

        // If we have enough players for at least 2 teams of target size
        if (playerCount >= targetTeamSize * 2) {
            // Standard formation with possible extra players
            const teamCount = Math.ceil(playerCount / targetTeamSize);
            
            for (let i = 0; i < teamCount; i++) {
                const startIndex = i * targetTeamSize;
                const endIndex = Math.min(startIndex + targetTeamSize, playerCount);
                const teamPlayers = players.slice(startIndex, endIndex);
                
                teams.push({
                    name: `Team ${String.fromCharCode(65 + i)}`,
                    players: teamPlayers
                });
            }
        } else {
            // Create 2 teams with uneven distribution
            const halfPoint = Math.ceil(playerCount / 2);
            
            teams.push({
                name: 'Team A',
                players: players.slice(0, halfPoint)
            });
            
            teams.push({
                name: 'Team B',
                players: players.slice(halfPoint)
            });
        }

        return teams;
    }

    // Shuffle array using Fisher-Yates algorithm
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Display team results
    displayResults() {
        const resultsSection = document.getElementById('results-section');
        const teamsContainer = document.getElementById('teams-container');
        
        teamsContainer.innerHTML = '';
        
        this.teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            
            teamCard.innerHTML = `
                <div class="team-header">
                    <span class="team-name">${team.name}</span>
                    <span class="team-size-badge">${team.players.length} players</span>
                </div>
                <div class="team-players">
                    ${team.players.map(player => `
                        <div class="player-item">${player}</div>
                    `).join('')}
                </div>
            `;
            
            teamsContainer.appendChild(teamCard);
        });
        
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Save results to file
    saveResults() {
        if (this.teams.length === 0) {
            this.showNotification('No results to save!', 'error');
            return;
        }

        let content = `Basketball Team Randomizer Results\n`;
        content += `Generated on: ${new Date().toLocaleString()}\n`;
        content += `Total Players: ${this.players.length}\n`;
        content += `Team Size: ${this.selectedTeamSize}\n\n`;

        this.teams.forEach(team => {
            content += `${team.name} (${team.players.length} players):\n`;
            team.players.forEach(player => {
                content += `  - ${player}\n`;
            });
            content += '\n';
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `basketball-teams-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification(this.languages[this.currentLanguage].resultsSaved, 'success');
    }

    // Copy results to clipboard
    async copyResults() {
        if (this.teams.length === 0) {
            this.showNotification('No results to copy!', 'error');
            return;
        }

        let content = `Basketball Team Randomizer Results\n`;
        content += `Generated on: ${new Date().toLocaleString()}\n`;
        content += `Total Players: ${this.players.length}\n`;
        content += `Team Size: ${this.selectedTeamSize}\n\n`;

        this.teams.forEach(team => {
            content += `${team.name} (${team.players.length} players):\n`;
            team.players.forEach(player => {
                content += `  - ${player}\n`;
            });
            content += '\n';
        });

        try {
            await navigator.clipboard.writeText(content);
            this.showNotification(this.languages[this.currentLanguage].resultsCopied, 'success');
        } catch (error) {
            this.showNotification('Failed to copy to clipboard!', 'error');
        }
    }

    // Reset the application
    reset() {
        if (confirm('Are you sure you want to reset all data?')) {
            this.players = [];
            this.selectedTeamSize = null;
            this.teams = [];
            
            // Clear UI
            document.getElementById('player-name-input').value = '';
            document.getElementById('results-section').classList.add('hidden');
            document.getElementById('warning-message').classList.add('hidden');
            
            // Clear team size selection
            document.querySelectorAll('.team-size-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Clear predefined player selection
            document.querySelectorAll('.player-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            this.updateUI();
            this.saveToLocalStorage();
            this.showNotification(this.languages[this.currentLanguage].resetConfirmed, 'success');
        }
    }

    // Toggle language
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'th' : 'en';
        this.updateLanguage();
        this.saveToLocalStorage();
    }

    // Update language throughout the UI
    updateLanguage() {
        const lang = this.languages[this.currentLanguage];
        
        // Update all text elements
        document.getElementById('app-title').textContent = lang.appTitle;
        document.getElementById('predefined-players-title').textContent = lang.predefinedPlayersTitle;
        document.getElementById('player-input-title').textContent = lang.playerInputTitle;
        document.getElementById('add-btn-text').textContent = lang.addBtnText;
        document.getElementById('player-count-text').textContent = lang.playerCountText;
        document.getElementById('player-list-title').textContent = lang.playerListTitle;
        document.getElementById('no-players-text').textContent = lang.noPlayersText;
        document.getElementById('team-size-title').textContent = lang.teamSizeTitle;
        document.getElementById('selected-size-text').textContent = lang.selectedSizeText;
        document.getElementById('team-count-text').textContent = lang.teamCountText;
        document.getElementById('extra-players-text').textContent = lang.extraPlayersText;
        document.getElementById('randomize-text').textContent = lang.randomizeText;
        document.getElementById('reset-text').textContent = lang.resetText;
        document.getElementById('results-title').textContent = lang.resultsTitle;
        document.getElementById('save-text').textContent = lang.saveText;
        document.getElementById('copy-text').textContent = lang.copyText;
        document.getElementById('lang-text').textContent = lang.langText;
        
        // Update language button class
        const langBtn = document.getElementById('lang-toggle');
        langBtn.className = `lang-btn ${this.currentLanguage}`;
    }

    // Update the UI
    updateUI() {
        this.updatePlayerList();
        this.updatePlayerCount();
        this.updateTeamInfo();
        this.updateRandomizeButton();
        this.updatePredefinedPlayerSelection();
    }

    // Update predefined player selection state
    updatePredefinedPlayerSelection() {
        document.querySelectorAll('.player-card').forEach(card => {
            const playerName = card.dataset.player;
            if (this.players.includes(playerName)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    // Update player list display
    updatePlayerList() {
        const playerList = document.getElementById('player-list');
        
        if (this.players.length === 0) {
            playerList.innerHTML = `<p id="no-players-text" class="no-players">${this.languages[this.currentLanguage].noPlayersText}</p>`;
            return;
        }

        playerList.innerHTML = '';
        this.players.forEach(player => {
            const playerTag = document.createElement('div');
            playerTag.className = 'player-tag';
            
            // Create the player name span
            const playerNameSpan = document.createElement('span');
            playerNameSpan.textContent = player;
            
            // Create the remove button
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-player';
            removeButton.innerHTML = '<i class="fas fa-times"></i>';
            removeButton.addEventListener('click', () => this.removePlayer(player));
            
            // Append elements to player tag
            playerTag.appendChild(playerNameSpan);
            playerTag.appendChild(removeButton);
            
            playerList.appendChild(playerTag);
        });
    }

    // Update player count display
    updatePlayerCount() {
        document.getElementById('player-count').textContent = this.players.length;
    }

    // Show notification
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Save data to local storage
    saveToLocalStorage() {
        const data = {
            players: this.players,
            selectedTeamSize: this.selectedTeamSize,
            currentLanguage: this.currentLanguage
        };
        localStorage.setItem('basketballTeamRandomizer', JSON.stringify(data));
    }

    // Load data from local storage
    loadFromLocalStorage() {
        const saved = localStorage.getItem('basketballTeamRandomizer');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.players = data.players || [];
                this.selectedTeamSize = data.selectedTeamSize || null;
                this.currentLanguage = data.currentLanguage || 'en';
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }
}

// Initialize the application when the DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BasketballTeamRandomizer();
}); 