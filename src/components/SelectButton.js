function SelectButton(passedMood) {
    var mood = 'btn-info';

    if (passedMood) {
        switch (passedMood) {
            case 'HAPPY':
                mood = 'btn-warning btn-sm';
                break;
            case 'SAD':
                mood = 'btn-primary btn-sm';
                break;
            case 'ANGRY':
                mood = 'btn-danger btn-sm';
                break;
            case 'EXCITED':
                mood = 'btn-success btn-sm';
                break;
            case 'DEPRESSED':
                mood = 'btn-secondary btn-sm';
                break;
            case 'NEUTRAL':
                mood = 'btn-info btn-sm';
                break;
            default:
                mood = 'btn-info btn-sm';
                break;
        }
    }
    return mood;
}

function SelectColor(passedMood) {
    var mood = '#68AEFD';

    if (passedMood) {
        switch (passedMood) {
            case 'HAPPY':
                mood = '#D4860B';
                break;
            case 'SAD':
                mood = '#1E2B37';
                break;
            case 'ANGRY':
                mood = '#E12E1C';
                break;
            case 'EXCITED':
                mood = '#149A80';
                break;
            case 'DEPRESSED':
                mood = '#809395';
                break;
            case 'NEUTRAL':
                mood = '#68AEFD';
                break;
            default:
                mood = '#68AEFD';
                break;
        }
    }
    return mood;
}

export { SelectButton, SelectColor }