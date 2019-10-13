class P4Parser {
    text = "";
    days = [];

    _line = 0;
    _day = -1;

    constructor(text) {
        this.setText(text);
        this.parse();
    }

    

    setText(text) {
        this.text = text.split("\n");
    }

    parse() {
        while (this._line < this.text.length) {
            if (this._lineStartsWith("[")) {
                // Date
                this.days.push(new P4Day());
                this._day++;
                this.parseDate();

            } else if (this._lineStartsWith("Note:")) {
                // Note
                this.parseNote();

            } else if (this._lineStartsWith("<")) {
                // All other blocks
                this.parseOther();

            } else {
                console.log(`Unknown block: ${this.text[this._line]}`);
                
            }
            this._line++;
        }
    }

    parseDate() {
        var content = this.text[this._line].replace(/[-\[\]]/g, '').split(" ");
        var monthDay = content[4].split("/");
        this.days[this._day].month =  monthDay[0];
        this.days[this._day].day = monthDay[1];
        this.days[this._day].dayOfWeek = content[5].replace(/[()]/g, '');
        this.days[this._day].weather = content[7];
        this._line++;
    }

    parseNote() {
        var content = this.text[this._line].replace("Note: ", "");
        this._line++;

        while (this._line < this.text.length &&
            !this._lineStartsWith("<") &&
            !this._lineStartsWith("[")) {
            content += this.text[this._line];
            this._line++;
        }
        this.days[this._day].note = content;
    }

    parseOther() {
        var headerLine = this._line;
        this._line++;
        var content = "";

        console.log(this.text[this._line]);
        while (this._line < this.text.length &&
               !this._lineStartsWith("<") &&
               !this._lineStartsWith("[")) {
            content += this.text[this._line];
            this._line++;
        }
        var currentLine = this._line;
        this._line = headerLine;

        if (this._lineStartsWith("<> P")) {
            // Persona needed
            this.days[this._day].personaNeeded = content;
        } else if (this._lineStartsWith("<> D")) {
            // Day event
            this.days[this._day].dayEvent = content;
        } else if (this._lineStartsWith("<> S.Link (D")) {
            // Day response
            this.days[this._day].dayResponse = content;
        } else if (this._lineStartsWith("<> N")) {
            // Night event
            this.days[this._day].nightEvent = content;
        } else if (this._lineStartsWith("<> S.Link (N")) {
            // Night response
            this.days[this._day].nightResponse = content;
        } else if (this._lineStartsWith("<> K")) {
            // Response
            this.days[this._day].response = content;
        } else {
            console.log(`Missed content: ${content}`);
        }

        this._line = currentLine;
    }

    _lineStartsWith(substring) {
        console.log(this._line);
        return this.text[this._line].startsWith(substring);
    }

}