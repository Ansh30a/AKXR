// FOR NAVIGATION MENU
const menuBtn = document.querySelector('.menu-btn')
const navigation = document.querySelector('.navigation')

menuBtn.addEventListener('click', (e) => {
    menuBtn.classList.toggle('active')
    navigation.classList.toggle('active')
})

// FOR VIDEO SLIDER
const sliderBtns = document.querySelectorAll('.nav-btn')
const slides = document.querySelectorAll('.video-slide')
const contents = document.querySelectorAll('.content')

var sliderNav = function(manual) {
    sliderBtns.forEach((btn) => {
        btn.classList.remove('active')
    })
    slides.forEach((slide) => {
        slide.classList.remove('active')
    })
    contents.forEach((content) => {
        content.classList.remove('active')
    })
    
    sliderBtns[manual].classList.add('active')
    slides[manual].classList.add('active')
    contents[manual].classList.add('active')
}

sliderBtns.forEach((sliderBtn, i) => {
    sliderBtn.addEventListener('click', (e) => {
        sliderNav(i)
    })
})

// FOR THEME TOGGLE
const themeToggle = document.querySelector('.theme-toggle')
const icon = themeToggle.querySelector('i')

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
    icon.classList.replace('fa-moon', 'fa-sun')
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    if (document.body.classList.contains('dark')) {
        icon.classList.replace('fa-moon', 'fa-sun')
        localStorage.setItem('theme', 'dark')
    } else {
        icon.classList.replace('fa-sun', 'fa-moon')
        localStorage.setItem('theme', 'light')
    }
})

// ===== CITY EXPLORER FEATURE =====

// API Keys
const OPENWEATHER_API_KEY = '91c02b32dd359ebeffdc2caf2f8fad98'
const GEOAPIFY_API_KEY = '4674d4963d0145b0b72d9d7825cce7fd'

// DOM Elements
const cityInput = document.getElementById('cityInput')
const searchBtn = document.getElementById('searchBtn')
const errorMessage = document.getElementById('errorMessage')
const loadingSpinner = document.getElementById('loadingSpinner')
const resultsContainer = document.getElementById('resultsContainer')
const weatherContent = document.getElementById('weatherContent')
const placesContent = document.getElementById('placesContent')

// Event Listeners
searchBtn.addEventListener('click', handleSearch)
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch()
    }
})

// Main search handler
async function handleSearch() {
    const cityName = cityInput.value.trim()
    
    if (!cityName) {
        showError('Please enter a city name')
        return
    }
    
    if (OPENWEATHER_API_KEY === 'YOUR_OPENWEATHER_KEY') {
        showError('Please add your OpenWeatherMap API key in script.js')
        return
    }
    
    hideError()
    showLoading()
    hideResults()
    
    try {
        console.log('🔍 Searching for:', cityName)
        
        // Get coordinates
        const coordinates = await getCityCoordinates(cityName)
        
        if (!coordinates) {
            showError('City not found. Please check the spelling and try again.')
            hideLoading()
            return
        }
        
        console.log('📍 Coordinates:', coordinates)
        
        // Fetch weather and places in parallel
        const [weatherData, placesData] = await Promise.all([
            getWeatherData(coordinates.lat, coordinates.lon, cityName),
            getGeoapifyPlaces(coordinates.lat, coordinates.lon, cityName)
        ])
        
        console.log('🌤️ Weather:', weatherData)
        console.log('📍 Places found:', placesData.length)
        
        // Display results
        displayWeather(weatherData, cityName)
        displayPlaces(placesData)
        
        showResults()
        hideLoading()
        
        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
        
    } catch (error) {
        console.error('❌ Error:', error)
        showError(`Error: ${error.message}`)
        hideLoading()
    }
}

// Get city coordinates from OpenWeather
async function getCityCoordinates(cityName) {
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${OPENWEATHER_API_KEY}`
        
        const response = await fetch(url)
        
        if (response.status === 401) {
            throw new Error('OpenWeatherMap API key invalid or not activated yet')
        }
        
        if (!response.ok) {
            throw new Error(`Geocoding failed: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (!data || data.length === 0) {
            return null
        }
        
        return {
            lat: data[0].lat,
            lon: data[0].lon,
            country: data[0].country
        }
    } catch (error) {
        console.error('Geocoding error:', error)
        throw error
    }
}

// Get weather data
async function getWeatherData(lat, lon, cityName) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }
        
        const data = await response.json()
        
        return {
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: data.wind.speed,
            pressure: data.main.pressure,
            cityName: cityName
        }
    } catch (error) {
        console.error('Weather error:', error)
        throw error
    }
}

// Get places from Geoapify Places API
async function getGeoapifyPlaces(lat, lon, cityName) {
    try {
        // Geoapify Places API endpoint
        const categories = 'tourism.sights,tourism.attraction,entertainment.museum,entertainment.theme_park,leisure.park,natural'
        const radius = 5000 // 5km radius
        
        const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
        
        console.log('🌐 Fetching places from Geoapify...')
        
        const requestOptions = {
            method: 'GET',
        }
        
        const response = await fetch(url, requestOptions)
        
        if (response.status === 401 || response.status === 403) {
            console.error('❌ Geoapify API key error:', response.status)
            throw new Error('Geoapify authentication failed')
        }
        
        if (!response.ok) {
            console.error('Geoapify error:', response.status)
            // Try without category filter
            return await getGeoapifyPlacesBroad(lat, lon)
        }
        
        const data = await response.json()
        
        console.log('Raw Geoapify response:', data)
        
        if (!data.features || data.features.length === 0) {
            console.log('⚠️ No places with category filter, trying broader search...')
            return await getGeoapifyPlacesBroad(lat, lon)
        }
        
        console.log(`✅ Found ${data.features.length} places`)
        
        return data.features.map(place => {
            const props = place.properties
            return {
                name: props.name || props.address_line1 || 'Point of Interest',
                categories: props.categories || ['attraction'],
                address: props.formatted || props.address_line2 || 'Address not available',
                distance: props.distance,
                lat: props.lat,
                lon: props.lon,
                city: props.city || cityName
            }
        })
        
    } catch (error) {
        console.error('Geoapify places error:', error)
        return []
    }
}

// Fallback: Broader search without category filter
async function getGeoapifyPlacesBroad(lat, lon) {
    try {
        const radius = 5000
        const url = `https://api.geoapify.com/v2/places?filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
        
        const requestOptions = {
            method: 'GET',
        }
        
        const response = await fetch(url, requestOptions)
        
        if (!response.ok) {
            console.error('Broad search failed:', response.status)
            return []
        }
        
        const data = await response.json()
        
        if (!data.features || data.features.length === 0) {
            console.log('⚠️ No places found in broad search either')
            return []
        }
        
        console.log(`✅ Broad search found ${data.features.length} places`)
        
        return data.features.map(place => {
            const props = place.properties
            return {
                name: props.name || props.address_line1 || 'Place of Interest',
                categories: props.categories || ['place'],
                address: props.formatted || props.address_line2 || 'Address not available',
                distance: props.distance,
                lat: props.lat,
                lon: props.lon
            }
        })
        
    } catch (error) {
        console.error('Broad search error:', error)
        return []
    }
}

// Display weather
function displayWeather(weather) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    
    weatherContent.innerHTML = `
        <div class="weather-card">
            <div class="weather-main">
                <img src="${iconUrl}" alt="${weather.description}" class="weather-icon">
                <div class="weather-temp">
                    <span class="temp-value">${weather.temperature}°C</span>
                    <span class="temp-desc">${weather.description}</span>
                </div>
            </div>
            <div class="weather-details">
                <div class="weather-detail-item">
                    <i class="fas fa-temperature-high"></i>
                    <span>Feels Like: ${weather.feelsLike}°C</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-tint"></i>
                    <span>Humidity: ${weather.humidity}%</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-wind"></i>
                    <span>Wind: ${weather.windSpeed} m/s</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-compress-arrows-alt"></i>
                    <span>Pressure: ${weather.pressure} hPa</span>
                </div>
            </div>
        </div>
    `
}

// Display places
function displayPlaces(places) {
    if (!places || places.length === 0) {
        placesContent.innerHTML = `
            <div class="no-places">
                <i class="fas fa-map-marked-alt"></i>
                <p>No popular attractions found in this area. Try a larger city like Paris, London, or New York.</p>
            </div>
        `
        return
    }
    
    placesContent.innerHTML = places.slice(0, 8).map(place => {
        const categoryNames = Array.isArray(place.categories) 
            ? place.categories.slice(0, 2).map(cat => {
                return cat.split('.').pop().replace(/_/g, ' ')
              }).join(', ')
            : 'Attraction'
        
        const distance = place.distance 
            ? (place.distance < 1000 
                ? `${Math.round(place.distance)}m away` 
                : `${(place.distance / 1000).toFixed(1)}km away`)
            : ''
        
        const photoUrl = `https://source.unsplash.com/400x300/?${encodeURIComponent(place.name)},landmark,${encodeURIComponent(place.city || 'city')}`
        
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`
        
        return `
            <div class="place-card" onclick="window.open('${mapsUrl}', '_blank')">
                <div class="place-image">
                    <img src="${photoUrl}" alt="${place.name}" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'">
                    ${distance ? `<span class="place-distance">${distance}</span>` : ''}
                </div>
                <div class="place-info">
                    <h4 class="place-name">${place.name}</h4>
                    <p class="place-kinds">
                        <i class="fas fa-tag"></i> ${categoryNames}
                    </p>
                    <p class="place-address">
                        <i class="fas fa-map-pin"></i> ${place.address}
                    </p>
                </div>
            </div>
        `
    }).join('')
}


// UI Helper Functions
function showLoading() {
    loadingSpinner.style.display = 'flex'
}

function hideLoading() {
    loadingSpinner.style.display = 'none'
}

function showError(message) {
    errorMessage.textContent = message
    errorMessage.style.display = 'block'
}

function hideError() {
    errorMessage.style.display = 'none'
}

function showResults() {
    resultsContainer.style.display = 'block'
}

function hideResults() {
    resultsContainer.style.display = 'none'
}
