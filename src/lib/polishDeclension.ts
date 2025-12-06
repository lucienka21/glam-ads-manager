// Polish declension helper for cities and names
// Converts nominative case to locative (miejscownik) for use in sentences

const cityDeclensions: Record<string, string> = {
  // Cities ending in -a (feminine)
  'Warszawa': 'Warszawie',
  'Kraków': 'Krakowie',
  'Łódź': 'Łodzi',
  'Wrocław': 'Wrocławiu',
  'Poznań': 'Poznaniu',
  'Gdańsk': 'Gdańsku',
  'Szczecin': 'Szczecinie',
  'Bydgoszcz': 'Bydgoszczy',
  'Lublin': 'Lublinie',
  'Białystok': 'Białymstoku',
  'Katowice': 'Katowicach',
  'Gdynia': 'Gdyni',
  'Częstochowa': 'Częstochowie',
  'Radom': 'Radomiu',
  'Sosnowiec': 'Sosnowcu',
  'Toruń': 'Toruniu',
  'Kielce': 'Kielcach',
  'Rzeszów': 'Rzeszowie',
  'Gliwice': 'Gliwicach',
  'Zabrze': 'Zabrzu',
  'Olsztyn': 'Olsztynie',
  'Bielsko-Biała': 'Bielsku-Białej',
  'Bytom': 'Bytomiu',
  'Zielona Góra': 'Zielonej Górze',
  'Rybnik': 'Rybniku',
  'Ruda Śląska': 'Rudzie Śląskiej',
  'Opole': 'Opolu',
  'Tychy': 'Tychach',
  'Gorzów Wielkopolski': 'Gorzowie Wielkopolskim',
  'Płock': 'Płocku',
  'Dąbrowa Górnicza': 'Dąbrowie Górniczej',
  'Elbląg': 'Elblągu',
  'Wałbrzych': 'Wałbrzychu',
  'Włocławek': 'Włocławku',
  'Tarnów': 'Tarnowie',
  'Chorzów': 'Chorzowie',
  'Koszalin': 'Koszalinie',
  'Kalisz': 'Kaliszu',
  'Legnica': 'Legnicy',
  'Grudziądz': 'Grudziądzu',
  'Jaworzno': 'Jaworznie',
  'Słupsk': 'Słupsku',
  'Jastrzębie-Zdrój': 'Jastrzębiu-Zdroju',
  'Nowy Sącz': 'Nowym Sączu',
  'Jelenia Góra': 'Jeleniej Górze',
  'Siedlce': 'Siedlcach',
  'Mysłowice': 'Mysłowicach',
  'Konin': 'Koninie',
  'Piła': 'Pile',
  'Piotrków Trybunalski': 'Piotrkowie Trybunalskim',
  'Inowrocław': 'Inowrocławiu',
  'Lubin': 'Lubinie',
  'Ostrów Wielkopolski': 'Ostrowie Wielkopolskim',
  'Suwałki': 'Suwałkach',
  'Stargard': 'Stargardzie',
  'Gniezno': 'Gnieźnie',
  'Ostrowiec Świętokrzyski': 'Ostrowcu Świętokrzyskim',
  'Siemianowice Śląskie': 'Siemianowicach Śląskich',
  'Głogów': 'Głogowie',
  'Pabianice': 'Pabianicach',
  'Leszno': 'Lesznie',
  'Zamość': 'Zamościu',
  'Łomża': 'Łomży',
  'Żory': 'Żorach',
  'Pruszków': 'Pruszkowie',
  'Ełk': 'Ełku',
  'Tarnowskie Góry': 'Tarnowskich Górach',
  'Tomaszów Mazowiecki': 'Tomaszowie Mazowieckim',
  'Chełm': 'Chełmie',
  'Mielec': 'Mielcu',
  'Kędzierzyn-Koźle': 'Kędzierzynie-Koźlu',
  'Przemyśl': 'Przemyślu',
  'Stalowa Wola': 'Stalowej Woli',
  'Tczew': 'Tczewie',
  'Biała Podlaska': 'Białej Podlaskiej',
  'Bełchatów': 'Bełchatowie',
  'Świdnica': 'Świdnicy',
  'Będzin': 'Będzinie',
  'Zgierz': 'Zgierzu',
  'Piekary Śląskie': 'Piekarach Śląskich',
  'Racibórz': 'Raciborzu',
  'Legionowo': 'Legionowie',
  'Ostrołęka': 'Ostrołęce',
  'Świętochłowice': 'Świętochłowicach',
  'Skierniewice': 'Skierniewicach',
  'Starachowice': 'Starachowicach',
  'Wejherowo': 'Wejherowie',
  'Puławy': 'Puławach',
  'Zawiercie': 'Zawierciu',
  'Brodnica': 'Brodnicy',
  'Ostrów Mazowiecka': 'Ostrowi Mazowieckiej',
  'Sochaczew': 'Sochaczewie',
  'Ciechanów': 'Ciechanowie',
  'Mińsk Mazowiecki': 'Mińsku Mazowieckim',
  'Żyrardów': 'Żyrardowie',
  'Wołomin': 'Wołominie',
  'Otwock': 'Otwocku',
  'Piaseczno': 'Piasecznie',
  'Grodzisk Mazowiecki': 'Grodzisku Mazowieckim',
  'Nowy Dwór Mazowiecki': 'Nowym Dworze Mazowieckim',
  'Kozienice': 'Kozienicach',
  'Marki': 'Markach',
  'Ząbki': 'Ząbkach',
  'Zielonka': 'Zielonce',
  'Kobyłka': 'Kobyłce',
  'Józefów': 'Józefowie',
  'Łuków': 'Łukowie',
  'Garwolin': 'Garwolinie',
  'Biłgoraj': 'Biłgoraju',
  'Hrubieszów': 'Hrubieszowie',
  'Kraśnik': 'Kraśniku',
  'Lubartów': 'Lubartowie',
  'Łęczna': 'Łęcznej',
  'Świdnik': 'Świdniku',
  'Dęblin': 'Dęblinie',
  'Ryki': 'Rykach',
  'Poniatowa': 'Poniatowej',
  'Opoczno': 'Opocznie',
  'Radomsko': 'Radomsku',
  'Wieluń': 'Wieluniu',
  'Zduńska Wola': 'Zduńskiej Woli',
  'Kutno': 'Kutnie',
  'Łowicz': 'Łowiczu',
  'Sieradz': 'Sieradzu',
  'Łęczyca': 'Łęczycy',
  'Aleksandrów Łódzki': 'Aleksandrowie Łódzkim',
  'Konstantynów Łódzki': 'Konstantynowie Łódzkim',
  'Ozorków': 'Ozorkowie',
  'Głowno': 'Głownie',
  'Koluszki': 'Koluszkach',
  'Brzeziny': 'Brzezinach',
  'Kolno': 'Kolnie',
  'Grajewo': 'Grajewie',
  'Augustów': 'Augustowie',
  'Sejny': 'Sejnach',
  'Hajnówka': 'Hajnówce',
  'Siemiatycze': 'Siemiatyczach',
  'Bielsk Podlaski': 'Bielsku Podlaskim',
  'Sokółka': 'Sokółce',
  'Mońki': 'Mońkach',
  'Zambrów': 'Zambrowie',
  'Wysokie Mazowieckie': 'Wysokiem Mazowieckim',
  'Łapy': 'Łapach',
  'Czarna Białostocka': 'Czarnej Białostockiej',
  'Supraśl': 'Supraślu',
  'Wasilków': 'Wasilkowie',
  'Choroszcz': 'Choroszczy',
  'Olecko': 'Olecku',
  'Giżycko': 'Giżycku',
  'Pisz': 'Piszu',
  'Szczytno': 'Szczytnie',
  'Mrągowo': 'Mrągowie',
  'Kętrzyn': 'Kętrzynie',
  'Bartoszyce': 'Bartoszycach',
  'Lidzbark Warmiński': 'Lidzbarku Warmińskim',
  'Braniewo': 'Braniewie',
  'Iława': 'Iławie',
  'Ostróda': 'Ostródzie',
  'Działdowo': 'Działdowie',
  'Nidzica': 'Nidzicy',
  'Nowe Miasto Lubawskie': 'Nowym Mieście Lubawskim',
  'Golub-Dobrzyń': 'Golubiu-Dobrzyniu',
  'Rypin': 'Rypinie',
  'Lipno': 'Lipnie',
  'Radziejów': 'Radziejowie',
  'Aleksandrów Kujawski': 'Aleksandrowie Kujawskim',
  'Ciechocinek': 'Ciechocinku',
  'Nieszawa': 'Nieszawie',
  'Kowal': 'Kowalu',
  'Chełmno': 'Chełmnie',
  'Świecie': 'Świeciu',
  'Nowe': 'Nowem',
  'Sępólno Krajeńskie': 'Sępólnie Krajeńskim',
  'Tuchola': 'Tucholi',
  'Nakło nad Notecią': 'Nakle nad Notecią',
  'Szubin': 'Szubinie',
  'Żnin': 'Żninie',
  'Mogilno': 'Mogilnie',
  'Strzelno': 'Strzelnie',
  'Kruszwica': 'Kruszwicy',
};

// Rules for declining names
function declineByRules(name: string): string {
  const trimmed = name.trim();
  
  // Multi-word names - decline last word
  if (trimmed.includes(' ')) {
    const parts = trimmed.split(' ');
    const lastPart = parts[parts.length - 1];
    const declinedLast = declineByRules(lastPart);
    parts[parts.length - 1] = declinedLast;
    return parts.join(' ');
  }

  // Check dictionary first
  if (cityDeclensions[trimmed]) {
    return cityDeclensions[trimmed];
  }

  // Apply grammatical rules
  const lower = trimmed.toLowerCase();
  
  // Feminine -a endings
  if (lower.endsWith('a')) {
    // -ka, -ga -> -ce, -dze (palatalization)
    if (lower.endsWith('ka')) {
      return trimmed.slice(0, -2) + 'ce';
    }
    if (lower.endsWith('ga')) {
      return trimmed.slice(0, -2) + 'dze';
    }
    // -owa -> -owej
    if (lower.endsWith('owa')) {
      return trimmed.slice(0, -1) + 'ej';
    }
    // -ia -> -ii
    if (lower.endsWith('ia')) {
      return trimmed.slice(0, -1) + 'i';
    }
    // -ja -> -ji
    if (lower.endsWith('ja')) {
      return trimmed.slice(0, -1) + 'i';
    }
    // Generic -a -> -ie
    return trimmed.slice(0, -1) + 'ie';
  }

  // Neuter -o endings
  if (lower.endsWith('o')) {
    // -no -> -nie
    if (lower.endsWith('no')) {
      return trimmed.slice(0, -1) + 'ie';
    }
    // -wo -> -wie
    if (lower.endsWith('wo')) {
      return trimmed.slice(0, -1) + 'ie';
    }
    // Generic -o -> -ie
    return trimmed.slice(0, -1) + 'ie';
  }

  // Neuter -e endings (places like Zakopane)
  if (lower.endsWith('e')) {
    // -ie -> -iu
    if (lower.endsWith('ie')) {
      return trimmed.slice(0, -2) + 'iu';
    }
    // -ce -> -cu
    if (lower.endsWith('ce')) {
      return trimmed.slice(0, -1) + 'u';
    }
    return trimmed;
  }

  // Masculine endings
  // -ów -> -owie
  if (lower.endsWith('ów')) {
    return trimmed.slice(0, -2) + 'owie';
  }
  // -ew -> -ewie
  if (lower.endsWith('ew')) {
    return trimmed + 'ie';
  }
  // -aw -> -awie
  if (lower.endsWith('aw')) {
    return trimmed + 'ie';
  }
  // -in -> -inie
  if (lower.endsWith('in')) {
    return trimmed + 'ie';
  }
  // -yn -> -ynie
  if (lower.endsWith('yn')) {
    return trimmed + 'ie';
  }
  // -ań -> -aniu
  if (lower.endsWith('ań')) {
    return trimmed.slice(0, -1) + 'niu';
  }
  // -eń -> -eniu
  if (lower.endsWith('eń')) {
    return trimmed.slice(0, -1) + 'niu';
  }
  // -ń -> -niu
  if (lower.endsWith('ń')) {
    return trimmed.slice(0, -1) + 'niu';
  }
  // -sk -> -sku
  if (lower.endsWith('sk')) {
    return trimmed + 'u';
  }
  // -ck -> -cku
  if (lower.endsWith('ck')) {
    return trimmed + 'u';
  }
  // -k -> -ku
  if (lower.endsWith('k')) {
    return trimmed + 'u';
  }
  // -c -> -cu
  if (lower.endsWith('c')) {
    return trimmed + 'u';
  }
  // -ec -> -cu (drop e)
  if (lower.endsWith('ec')) {
    return trimmed.slice(0, -2) + 'cu';
  }
  // -ż -> -żu
  if (lower.endsWith('ż')) {
    return trimmed + 'u';
  }
  // -sz -> -szu
  if (lower.endsWith('sz')) {
    return trimmed + 'u';
  }
  // -cz -> -czu
  if (lower.endsWith('cz')) {
    return trimmed + 'u';
  }
  // -dź -> -dziu
  if (lower.endsWith('dź')) {
    return trimmed.slice(0, -1) + 'ziu';
  }
  // -ł -> -le
  if (lower.endsWith('ł')) {
    return trimmed + 'e';
  }

  // Default: add -ie for consonants
  return trimmed + 'ie';
}

/**
 * Decline a Polish city name to locative case (miejscownik)
 * Used in sentences like "w [mieście]"
 */
export function declineCityToLocative(city: string): string {
  if (!city) return '';
  return declineByRules(city);
}

/**
 * Decline a Polish first name to vocative case (wołacz)
 * Used for addressing someone directly
 */
export function declineNameToVocative(name: string): string {
  if (!name) return '';
  
  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();
  
  // Common Polish names with irregular vocative
  const irregularNames: Record<string, string> = {
    'Ania': 'Aniu',
    'Anna': 'Anno',
    'Asia': 'Asiu',
    'Basia': 'Basiu',
    'Kasia': 'Kasiu',
    'Katarzyna': 'Katarzyno',
    'Gosia': 'Gosiu',
    'Małgorzata': 'Małgorzato',
    'Magda': 'Magdo',
    'Magdalena': 'Magdaleno',
    'Ola': 'Olu',
    'Aleksandra': 'Aleksandrę',
    'Ewa': 'Ewo',
    'Monika': 'Moniko',
    'Agnieszka': 'Agnieszko',
    'Joanna': 'Joanno',
    'Justyna': 'Justyno',
    'Karolina': 'Karolino',
    'Patrycja': 'Patrycjo',
    'Natalia': 'Natalio',
    'Marta': 'Marto',
    'Dorota': 'Doroto',
    'Beata': 'Beato',
    'Renata': 'Renato',
    'Iwona': 'Iwono',
    'Agata': 'Agato',
    'Sylwia': 'Sylwio',
    'Izabela': 'Izabelo',
    'Paulina': 'Paulino',
    'Weronika': 'Weroniko',
    'Dominika': 'Dominiko',
    'Kamila': 'Kamilo',
    'Edyta': 'Edyto',
    'Grażyna': 'Grażyno',
    'Halina': 'Halino',
    'Elżbieta': 'Elżbieto',
    'Teresa': 'Tereso',
    'Danuta': 'Danuto',
    'Barbara': 'Barbaro',
    'Zofia': 'Zofio',
    'Maria': 'Mario',
    'Krystyna': 'Krystyno',
    'Helena': 'Heleno',
    'Janina': 'Janino',
    'Jolanta': 'Jolanto',
    'Jadwiga': 'Jadwigo',
  };

  if (irregularNames[trimmed]) {
    return irregularNames[trimmed];
  }

  // Rules for vocative
  // Feminine names ending in -a
  if (lower.endsWith('a')) {
    // -ka -> -ko
    if (lower.endsWith('ka')) {
      return trimmed.slice(0, -1) + 'o';
    }
    // -ia -> -iu
    if (lower.endsWith('ia') || lower.endsWith('ja')) {
      return trimmed.slice(0, -1) + 'u';
    }
    // -a -> -o
    return trimmed.slice(0, -1) + 'o';
  }

  // Masculine names - typically use nominative as vocative in modern Polish
  return trimmed;
}

/**
 * Format phone number for display and copying
 * Ensures proper Polish format: +48 XXX XXX XXX
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');
  
  // If starts with 48, add +
  if (digits.startsWith('48') && digits.length > 9) {
    digits = digits.slice(2);
  }
  
  // Ensure 9 digits for Polish numbers
  if (digits.length === 9) {
    return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  
  // Return original if can't format
  return phone;
}
