const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
    "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const regionData = {
    "United States": {
            "Alabama": ["Birmingham", "Montgomery", "Huntsville"],
            "Alaska": ["Anchorage", "Juneau", "Fairbanks"],
            "Arizona": ["Phoenix", "Tucson", "Mesa"],
            "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville"],
            "California": ["Los Angeles", "San Francisco", "San Diego"],
            "Colorado": ["Denver", "Colorado Springs", "Aurora"],
            "Connecticut": ["Bridgeport", "New Haven", "Hartford"],
            "Delaware": ["Wilmington", "Dover", "Newark"],
            "Florida": ["Miami", "Orlando", "Tampa"],
            "Georgia": ["Atlanta", "Augusta", "Savannah"],
            "Hawaii": ["Honolulu", "Hilo", "Kailua"],
            "Idaho": ["Boise", "Idaho Falls", "Meridian"],
            "Illinois": ["Chicago", "Springfield", "Aurora"],
            "Indiana": ["Indianapolis", "Fort Wayne", "Evansville"],
            "Iowa": ["Des Moines", "Cedar Rapids", "Davenport"],
            "Kansas": ["Wichita", "Overland Park", "Kansas City"],
            "Kentucky": ["Louisville", "Lexington", "Bowling Green"],
            "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport"],
            "Maine": ["Portland", "Bangor", "Augusta"],
            "Maryland": ["Baltimore", "Annapolis", "Frederick"],
            "Massachusetts": ["Boston", "Worcester", "Springfield"],
            "Michigan": ["Detroit", "Grand Rapids", "Lansing"],
            "Minnesota": ["Minneapolis", "Saint Paul", "Rochester"],
            "Mississippi": ["Jackson", "Gulfport", "Hattiesburg"],
            "Missouri": ["Kansas City", "St. Louis", "Springfield"],
            "Montana": ["Billings", "Missoula", "Great Falls"],
            "Nebraska": ["Omaha", "Lincoln", "Bellevue"],
            "Nevada": ["Las Vegas", "Reno", "Henderson"],
            "New Hampshire": ["Manchester", "Nashua", "Concord"],
            "New Jersey": ["Newark", "Jersey City", "Paterson"],
            "New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces"],
            "New York": ["New York City", "Buffalo", "Rochester"],
            "North Carolina": ["Charlotte", "Raleigh", "Greensboro"],
            "North Dakota": ["Fargo", "Bismarck", "Grand Forks"],
            "Ohio": ["Columbus", "Cleveland", "Cincinnati"],
            "Oklahoma": ["Oklahoma City", "Tulsa", "Norman"],
            "Oregon": ["Portland", "Eugene", "Salem"],
            "Pennsylvania": ["Philadelphia", "Pittsburgh", "Harrisburg"],
            "Rhode Island": ["Providence", "Warwick", "Cranston"],
            "South Carolina": ["Charleston", "Columbia", "Greenville"],
            "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen"],
            "Tennessee": ["Nashville", "Memphis", "Knoxville"],
            "Texas": ["Houston", "Dallas", "Austin"],
            "Utah": ["Salt Lake City", "Provo", "West Valley City"],
            "Vermont": ["Burlington", "Montpelier", "Rutland"],
            "Virginia": ["Virginia Beach", "Richmond", "Norfolk"],
            "Washington": ["Seattle", "Spokane", "Tacoma"],
            "West Virginia": ["Charleston", "Huntington", "Morgantown"],
            "Wisconsin": ["Milwaukee", "Madison", "Green Bay"],
            "Wyoming": ["Cheyenne", "Casper", "Laramie"]
    },
    "Canada": {
        "Alberta": ["Calgary", "Edmonton", "Red Deer"],
            "British Columbia": ["Vancouver", "Victoria", "Surrey"],
            "Manitoba": ["Winnipeg", "Brandon", "Steinbach"],
            "New Brunswick": ["Fredericton", "Moncton", "Saint John"],
            "Newfoundland and Labrador": ["St. John's", "Corner Brook", "Mount Pearl"],
            "Nova Scotia": ["Halifax", "Sydney", "Dartmouth"],
            "Ontario": ["Toronto", "Ottawa", "Hamilton"],
            "Prince Edward Island": ["Charlottetown", "Summerside", "Stratford"],
            "Quebec": ["Montreal", "Quebec City", "Laval"],
            "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert"]
    },
    "Brazil": {
            "Acre": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
            "Alagoas": ["Maceió", "Arapiraca", "Palmeira dos Índios"],
            "Amapá": ["Macapá", "Santana", "Laranjal do Jari"],
            "Amazonas": ["Manaus", "Parintins", "Itacoatiara"],
            "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista"],
            "Ceará": ["Fortaleza", "Juazeiro do Norte", "Sobral"],
            "Distrito Federal": ["Brasília", "Taguatinga", "Ceilândia"],
            "Espírito Santo": ["Vitória", "Vila Velha", "Serra"],
            "Goiás": ["Goiânia", "Anápolis", "Aparecida de Goiânia"],
            "Maranhão": ["São Luís", "Imperatriz", "Caxias"],
            "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
            "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas"],
            "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem"],
            "Pará": ["Belém", "Santarém", "Marabá"],
            "Paraíba": ["João Pessoa", "Campina Grande", "Santa Rita"],
            "Paraná": ["Curitiba", "Londrina", "Maringá"],
            "Pernambuco": ["Recife", "Olinda", "Caruaru"],
            "Piauí": ["Teresina", "Parnaíba", "Picos"],
            "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis"],
            "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim"],
            "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
            "Rondônia": ["Porto Velho", "Ji-Paraná", "Ariquemes"],
            "Roraima": ["Boa Vista", "Rorainópolis", "Caracaraí"],
            "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau"],
            "São Paulo": ["São Paulo", "Campinas", "Santos"],
            "Sergipe": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"]
    },
    "Germany": {
            "Bavaria": ["Munich", "Nuremberg", "Augsburg"],
            "Berlin": ["Berlin"],
            "Baden-Württemberg": ["Stuttgart", "Karlsruhe", "Mannheim"],
            "Brandenburg": ["Potsdam", "Cottbus", "Brandenburg an der Havel"],
            "Bremen": ["Bremen"],
            "Hamburg": ["Hamburg"],
            "Hesse": ["Frankfurt", "Wiesbaden", "Kassel"],
            "Lower Saxony": ["Hanover", "Braunschweig", "Oldenburg"],
            "Mecklenburg-Vorpommern": ["Schwerin", "Rostock", "Neubrandenburg"],
            "North Rhine-Westphalia": ["Düsseldorf", "Cologne", "Dortmund"],
            "Rhineland-Palatinate": ["Mainz", "Ludwigshafen", "Koblenz"],
            "Saarland": ["Saarbrücken", "Neunkirchen", "Homburg"],
            "Saxony": ["Dresden", "Leipzig", "Chemnitz"],
            "Saxony-Anhalt": ["Magdeburg", "Halle", "Dessau"],
            "Schleswig-Holstein": ["Kiel", "Lübeck", "Flensburg"],
            "Thuringia": ["Erfurt", "Weimar", "Jena"]
    },
    "India": {
            "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
            "Arunachal Pradesh": ["Itanagar", "Pasighat", "Tawang"],
            "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
            "Bihar": ["Patna", "Gaya", "Bhagalpur"],
            "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
            "Goa": ["Panaji", "Margao", "Vasco da Gama"],
            "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
            "Haryana": ["Gurugram", "Faridabad", "Panipat"],
            "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali"],
            "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
            "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
            "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
            "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
            "Manipur": ["Imphal", "Thoubal", "Bishnupur"],
            "Meghalaya": ["Shillong", "Tura", "Jowai"],
            "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
            "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
            "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
            "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
            "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
            "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
            "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
            "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
            "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
            "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
            "West Bengal": ["Kolkata", "Howrah", "Darjeeling"]
    },
    "Japan": {
            "Aichi": ["Nagoya", "Toyota", "Okazaki"],
            "Akita": ["Akita", "Yokote", "Oga"],
            "Aomori": ["Aomori", "Hirosaki", "Hachinohe"],
            "Chiba": ["Chiba", "Funabashi", "Matsudo"],
            "Ehime": ["Matsuyama", "Imabari", "Niihama"],
            "Fukui": ["Fukui", "Sakai", "Tsuruga"],
            "Fukuoka": ["Fukuoka", "Kitakyushu", "Kurume"],
            "Fukushima": ["Fukushima", "Koriyama", "Iwaki"],
            "Gifu": ["Gifu", "Ogaki", "Kakamigahara"],
            "Gunma": ["Maebashi", "Takasaki", "Ota"],
            "Hiroshima": ["Hiroshima", "Kure", "Fukuyama"],
            "Hokkaido": ["Sapporo", "Hakodate", "Asahikawa"],
            "Hyogo": ["Kobe", "Himeji", "Amagasaki"],
            "Ibaraki": ["Mito", "Tsukuba", "Hitachi"],
            "Ishikawa": ["Kanazawa", "Komatsu", "Nanao"],
            "Iwate": ["Morioka", "Ichinoseki", "Miyako"],
            "Kagawa": ["Takamatsu", "Marugame", "Sakaide"],
            "Kagoshima": ["Kagoshima", "Kanoya", "Ibusuki"],
            "Kanagawa": ["Yokohama", "Kawasaki", "Sagamihara"],
            "Kochi": ["Kochi", "Nankoku", "Sukumo"],
            "Kumamoto": ["Kumamoto", "Yatsushiro", "Amakusa"],
            "Kyoto": ["Kyoto", "Uji", "Kameoka"],
            "Mie": ["Tsu", "Yokkaichi", "Suzuka"],
            "Miyagi": ["Sendai", "Ishinomaki", "Osaki"],
            "Miyazaki": ["Miyazaki", "Nichinan", "Hyuga"],
            "Nagano": ["Nagano", "Matsumoto", "Ueda"],
            "Nagasaki": ["Nagasaki", "Sasebo", "Shimabara"],
            "Nara": ["Nara", "Yamatokoriyama", "Kashihara"],
            "Niigata": ["Niigata", "Nagaoka", "Joetsu"],
            "Oita": ["Oita", "Beppu", "Nakatsu"],
            "Okayama": ["Okayama", "Kurashiki", "Tsuyama"],
            "Okinawa": ["Naha", "Okinawa City", "Urasoe"],
            "Osaka": ["Osaka", "Sakai", "Higashiosaka"],
            "Saga": ["Saga", "Karatsu", "Tosu"],
            "Saitama": ["Saitama", "Kawaguchi", "Koshigaya"],
            "Shiga": ["Otsu", "Hikone", "Kusatsu"],
            "Shimane": ["Matsue", "Izumo", "Hamada"],
            "Shizuoka": ["Shizuoka", "Hamamatsu", "Numazu"],
            "Tochigi": ["Utsunomiya", "Ashikaga", "Tochigi"],
            "Tokushima": ["Tokushima", "Naruto", "Anan"],
            "Tokyo": ["Tokyo", "Hachioji", "Machida"],
            "Tottori": ["Tottori", "Yonago", "Kurayoshi"],
            "Toyama": ["Toyama", "Takaoka", "Uozu"],
            "Wakayama": ["Wakayama", "Tanabe", "Kainan"],
            "Yamagata": ["Yamagata", "Tsuruoka", "Sakata"],
            "Yamaguchi": ["Shimonoseki", "Ube", "Yamaguchi"],
            "Yamanashi": ["Kofu", "Fujiyoshida", "Minami-Alps"]
    },
    "North Korea": {
            "Pyongyang": ["Pyongyang"],
            "Hamgyong": ["Hamhung", "Chongjin"],
            "Hwanghae": ["Haeju", "Sariwon"],
            "Kangwon": ["Wonsan", "Munchon"],
            "North Pyongan": ["Sinuiju", "Chongju"],
            "South Pyongan": ["Pyongsong", "Anju"],
            "Ryanggang": ["Hyesan", "Kimjongsuk"],
            "Chagang": ["Kanggye", "Huichon"]
    },
    "South Korea": {
            "Seoul": ["Seoul"],
            "Busan": ["Busan"],
            "Incheon": ["Incheon"],
            "Daegu": ["Daegu"],
            "Daejeon": ["Daejeon"],
            "Gwangju": ["Gwangju"],
            "Ulsan": ["Ulsan"],
            "Gyeonggi": ["Suwon", "Goyang", "Yongin"],
            "Gangwon": ["Chuncheon", "Gangneung"],
            "North Chungcheong": ["Cheongju", "Chungju"],
            "South Chungcheong": ["Daejeon", "Cheonan"],
            "North Jeolla": ["Jeonju", "Gunsan"],
            "South Jeolla": ["Gwangju", "Yeosu"],
            "North Gyeongsang": ["Daegu", "Pohang"],
            "South Gyeongsang": ["Busan", "Changwon"],
            "Jeju": ["Jeju City"]
    },
    "Mexico": {
            "Aguascalientes": ["Aguascalientes", "Calvillo"],
            "Baja California": ["Tijuana", "Mexicali"],
            "Baja California Sur": ["La Paz", "Cabo San Lucas"],
            "Campeche": ["Campeche", "Ciudad del Carmen"],
            "Chiapas": ["Tuxtla Gutiérrez", "San Cristóbal de las Casas"],
            "Chihuahua": ["Chihuahua", "Ciudad Juárez"],
            "Coahuila": ["Saltillo", "Torreón"],
            "Colima": ["Colima", "Manzanillo"],
            "Durango": ["Durango", "Gómez Palacio"],
            "Guanajuato": ["León", "Guanajuato"],
            "Guerrero": ["Acapulco", "Chilpancingo"],
            "Hidalgo": ["Pachuca", "Tulancingo"],
            "Jalisco": ["Guadalajara", "Zapopan"],
            "Mexico City": ["Mexico City"],
            "Michoacán": ["Morelia", "Uruapan"],
            "Morelos": ["Cuernavaca", "Jiutepec"],
            "Nayarit": ["Tepic", "Bahía de Banderas"],
            "Nuevo León": ["Monterrey", "San Nicolás"],
            "Oaxaca": ["Oaxaca City", "Salina Cruz"],
            "Puebla": ["Puebla", "Tehuacán"],
            "Querétaro": ["Querétaro", "San Juan del Río"],
            "Quintana Roo": ["Cancún", "Chetumal"],
            "San Luis Potosí": ["San Luis Potosí", "Soledad"],
            "Sinaloa": ["Culiacán", "Mazatlán"],
            "Sonora": ["Hermosillo", "Ciudad Obregón"],
            "Tabasco": ["Villahermosa", "Teapa"],
            "Tamaulipas": ["Tampico", "Reynosa"],
            "Tlaxcala": ["Tlaxcala City", "Apizaco"],
            "Veracruz": ["Veracruz", "Xalapa"],
            "Yucatán": ["Mérida", "Valladolid"],
            "Zacatecas": ["Zacatecas City", "Guadalupe"]
    },
    "Spain": {
            "Andalusia": ["Seville", "Malaga", "Granada"],
            "Aragon": ["Zaragoza", "Huesca"],
            "Asturias": ["Oviedo", "Gijón"],
            "Balearic Islands": ["Palma", "Ibiza"],
            "Basque Country": ["Bilbao", "San Sebastián"],
            "Canary Islands": ["Las Palmas", "Santa Cruz de Tenerife"],
            "Cantabria": ["Santander", "Torrelavega"],
            "Castile and León": ["Valladolid", "Salamanca"],
            "Castile-La Mancha": ["Toledo", "Albacete"],
            "Catalonia": ["Barcelona", "Tarragona"],
            "Extremadura": ["Mérida", "Badajoz"],
            "Galicia": ["Santiago de Compostela", "A Coruña"],
            "La Rioja": ["Logroño"],
            "Madrid": ["Madrid"],
            "Murcia": ["Murcia", "Cartagena"],
            "Navarre": ["Pamplona"],
            "Valencian Community": ["Valencia", "Alicante", "Castellón"]
    },
    "United Kingdom": {
            "England": ["London", "Manchester", "Birmingham"],
            "Northern Ireland": ["Belfast", "Derry"],
            "Scotland": ["Glasgow", "Edinburgh"],
            "Wales": ["Cardiff", "Swansea"]
    }
};


const countryFormats = {
    'Brazil': {
        'format': '{name}, {addressLine1}, {addressLine2}, {neighbourhood}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Apt/Suite',
            'region': 'State',
            'postalCode': 'CEP'
        },
        'postalCodeFormat': '#####-###'
    },
    'Canada': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street Number and Name',
            'addressLine2': 'Unit Number',
            'region': 'Province',
            'postalCode': 'Postal Code',
            'country': 'Country'
        },
        'postalCodeFormat': 'A#A-#A#'
    },
    'Germany': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street Address',
            'addressLine2': 'Optional Address Line',
            'region': 'State',
            'postalCode': 'Postal Code'
        },
        'postalCodeFormat': '#####'
    },
    'India': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street Address',
            'addressLine2': 'Landmark',
            'region': 'State',
            'postalCode': 'PIN'
        },
        'postalCodeFormat': '######'
    },
    'Japan': {
        'format': '{postalCode}, {region}, {city}, {addressLine1}, {addressLine2}, {name}',
        'labels': {
            'region': 'Prefecture',
            'city': 'City',
            'addressLine1': 'Neighborhood, Block',
            'addressLine2': 'Building Name, Apartment Number'
        },
        'postalCodeFormat': '###-####'
    },
    'North Korea': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'District',
            'city': 'City',
            'region': 'Province',
            'postalCode': 'Postal Code',
            'country': 'Country'
        },
        'postalCodeFormat': '#####'
    },
    'South Korea': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'District',
            'city': 'City',
            'region': 'Province',
            'postalCode': 'Postal Code',
            'country': 'Country'
        },
        'postalCodeFormat': '#####'
    },
    'Mexico': {
        'format': '{name}, {addressLine1}, {addressLine2}, {neighbourhood}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Neighborhood',
            'city': 'City',
            'region': 'State',
            'postalCode': 'Postal Code',
            'country': 'Country'
        },
        'postalCodeFormat': '#####'
    },
    'Spain': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Neighborhood',
            'city': 'City',
            'region': 'Region',
            'postalCode': 'Postal Code',
            'country': 'Country'
        },
        'postalCodeFormat': '#####'
    },
    'UK': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}, {country}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'County',
            'city': 'City',
            'region': 'Region',
            'postalCode': 'Postal Code',
            'country': 'Country'
        },
        'postalCodeFormat': 'A# #AA'
    },
    'USA': {
        'format': '{name}, {addressLine1}, {addressLine2}, {city}, {region}, {postalCode}',
        'labels': {
            'addressLine1': 'Street',
            'addressLine2': 'Apt/Suite',
            'region': 'State',
            'postalCode': 'ZIP Code'
        },
        'postalCodeFormat': 'AA9A 9AA'
    },
};

module.exports = {
    countries,
    regionData,
    countryFormats,
}