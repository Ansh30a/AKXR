// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Add Enter key support
document.getElementById('pokemon').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchData();
    }
});

// Hide display on initial load
document.getElementById('pokemon-display').style.display = 'none';
document.getElementById('error-message').style.display = 'none';
document.getElementById('loading').style.display = 'none';

// Type colors for Pokemon types
const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

async function fetchData() {
    try {
        const pokemonName = document.getElementById('pokemon').value.toLowerCase().trim();
        
        if (!pokemonName) {
            showError('Please enter a Pokemon name!');
            return;
        }

        // Show loading
        showLoading();
        hideError();
        hideDisplay();

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!res.ok) {
            throw new Error('Pokemon not found');
        }
        
        const data = await res.json();
        console.log(data);
        
        displayPokemon(data);
        hideLoading();
        
    } catch (error) {
        console.error(error);
        hideLoading();
        showError('Pokemon not found! Please check the spelling and try again.');
    }
}

function displayPokemon(data) {
    // Show display
    const displayElement = document.getElementById('pokemon-display');
    displayElement.style.display = 'block';
    
    // Trigger animation
    const card = document.querySelector('.pokemon-card');
    card.classList.remove('card-enter');
    void card.offsetWidth; // Trigger reflow
    card.classList.add('card-enter');
    
    // Name and ID
    document.getElementById('pokemon-name').textContent = 
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.getElementById('pokemon-id').textContent = 
        `#${String(data.id).padStart(4, '0')}`;
    
    // Images
    const imgFront = document.getElementById('pokemon-image-front');
    const imgBack = document.getElementById('pokemon-image-back');
    
    imgFront.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    imgBack.src = data.sprites.back_default || data.sprites.front_default;
    // imgBack.src = data.sprites.other['dream_world'].front_default || data.sprites.front_default;
    
    // Types
    const typesContainer = document.getElementById('pokemon-types');
    typesContainer.innerHTML = '';
    data.types.forEach((typeInfo, index) => {
        const typeSpan = document.createElement('span');
        typeSpan.className = 'type-badge';
        typeSpan.textContent = typeInfo.type.name;
        typeSpan.style.backgroundColor = typeColors[typeInfo.type.name] || '#777';
        typeSpan.style.animationDelay = `${index * 0.1}s`;
        typesContainer.appendChild(typeSpan);
    });
    
    // Stats
    const statsContainer = document.getElementById('stat-bars');
    statsContainer.innerHTML = '';
    data.stats.forEach((statInfo, index) => {
        const statDiv = document.createElement('div');
        statDiv.className = 'stat-item';
        statDiv.style.animationDelay = `${index * 0.05}s`;
        
        const statName = statInfo.stat.name
            .replace('special-attack', 'Sp. Atk')
            .replace('special-defense', 'Sp. Def')
            .replace('-', ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        const percentage = (statInfo.base_stat / 255) * 100;
        
        statDiv.innerHTML = `
            <div class="stat-info">
                <span class="stat-name">${statName}</span>
                <span class="stat-value">${statInfo.base_stat}</span>
            </div>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        statsContainer.appendChild(statDiv);
    });
    
    // Height and Weight
    document.getElementById('pokemon-height').textContent = 
        `${(data.height / 10).toFixed(1)} m`;
    document.getElementById('pokemon-weight').textContent = 
        `${(data.weight / 10).toFixed(1)} kg`;
    document.getElementById('pokemon-exp').textContent = 
        data.base_experience || 'N/A';
    
    // Abilities
    const abilitiesContainer = document.getElementById('pokemon-abilities');
    abilitiesContainer.innerHTML = '';
    data.abilities.forEach((abilityInfo, index) => {
        const abilityBadge = document.createElement('span');
        abilityBadge.className = 'ability-badge';
        abilityBadge.style.animationDelay = `${index * 0.1}s`;
        const abilityName = abilityInfo.ability.name
            .replace('-', ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        abilityBadge.textContent = abilityName;
        if (abilityInfo.is_hidden) {
            abilityBadge.classList.add('hidden-ability');
            abilityBadge.title = 'Hidden Ability';
        }
        abilitiesContainer.appendChild(abilityBadge);
    });
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.querySelector('p').textContent = message;
    errorDiv.style.display = 'flex';
    errorDiv.classList.remove('error-enter');
    void errorDiv.offsetWidth;
    errorDiv.classList.add('error-enter');
}

function hideError() {
    document.getElementById('error-message').style.display = 'none';
}

function hideDisplay() {
    document.getElementById('pokemon-display').style.display = 'none';
}