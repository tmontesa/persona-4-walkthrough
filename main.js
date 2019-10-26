class P4Date {
    date;
    dayOfWeek;
    weather;

    constructor(date, dayOfWeek, weather) {
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.weather = weather;
        return this;
    }
}

class P4Day {
    date;
    personaNeeded = "";
    dayEvents = "";
    daySLinkResponses = "";
    nightEvents = "";
    nightSLinkResponses = "";
    keyResponses = "";
    notes = "";

    constructor(date) {
        this.date = date;
        return this;
    }
}

var p4 = p4.split("\n");


days = [];
day = null;
line = 0;

while (line < p4.length) {
    if (p4[line].startsWith("[  ]")) {
        days.push(day);
        
        day = new P4Day(new P4Date(
            substringBetweenChars(p4[line], "[  ] --- ", " ("),
            substringBetweenChars(p4[line], "(", ")"),
            substringBetweenChars(p4[line], ") - ", " ")
        ));

        line++;
    }

    if (p4[line].startsWith("<> Persona")) {
        day.personaNeeded = p4[line].split(":")[1];
        line++;
    }

    if (p4[line].startsWith("<> Day")) {
        line++;

        day.dayEvents = "";
        while (!p4[line] == "") {
            day.dayEvents = day.dayEvents.concat(p4[line] + "<br />");
            line++;
        }
    }

    if (p4[line].startsWith("<> S.Link (Day)")) {
        line++;

        day.daySLinkResponses = "";
        while (!p4[line] == "") {
            day.daySLinkResponses = day.daySLinkResponses.concat(p4[line] + "<br />");
            line++;
        }
    }

    if (p4[line].startsWith("<> Night")) {
        line++;

        day.nightEvents = "";
        while (!p4[line] == "") {
            day.nightEvents = day.nightEvents.concat(p4[line] + "<br />");
            line++;
        }
    }

    if (p4[line].startsWith("<> S.Link (Night)")) {
        line++;

        day.nightSLinkResponses = "";
        while (!p4[line] == "") {
            day.nightSLinkResponses = day.nightSLinkResponses.concat(p4[line] + "<br />");
            line++;
        }
    }

    if (p4[line].startsWith("<> Key")) {
        line++;

        day.keyResponses = "";
        while (!p4[line] == "") {
            day.keyResponses = day.keyResponses.concat(p4[line] + "<br />");
            line++;
        }
    }

    if(p4[line].startsWith("Note:")) {
        day.notes = p4[line].split(": ")[1] + " ";
        line++;

        while (!p4[line] == []) {
            day.notes = day.notes.concat(p4[line] + " ");
            line++
        }
    }

    line++;
}




elem = new class {
    date = document.getElementById("date");
    personaNeeded = document.getElementById("personaNeeded");
    dayEvents = document.getElementById("dayEvents");
    daySLinkResponses = document.getElementById("daySLinkResponses");
    nightEvents = document.getElementById("nightEvents");
    nightSLinkResponses = document.getElementById("nightSLinkResponses");
    keyResponses = document.getElementById("keyResponses");
    notes = document.getElementById("notes");
    day = document.getElementById("day");
}

day_index = 1;
day = days[day_index];
function generateInfo(dayGiven) {
    day_index = dayGiven;
    day = days[day_index];
    elem.day.value = parseInt(dayGiven);
    elem.date.innerHTML = `${day.date.date} (${day.date.dayOfWeek})`;
    elem.personaNeeded.innerHTML = `${day.personaNeeded}`;
    elem.dayEvents.innerHTML = `${day.dayEvents}`;
    elem.daySLinkResponses.innerHTML = `${day.daySLinkResponses}`;
    elem.nightEvents.innerHTML = `${day.nightEvents}`;
    elem.nightSLinkResponses.innerHTML = `${day.nightSLinkResponses}`;
    elem.keyResponses.innerHTML = `${day.keyResponses}`;
    elem.notes.innerHTML = `${day.notes}`;

    localStorage['dayIndexStore'] = day_index;
}

function getValueOfDay() {
    return parseInt(elem.day.value);
}