import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function mod(n, m) {
    return ((n % m) + m) % m;
  }

class cipher {
    // constructor
    constructor(alpha, action, key) {
        d3.select("#alpha").property("value", alpha);
        d3.select("#actionSelect").property("value", action);
        d3.select("#key").property("value", key);
        this.preKey = 0;
        this.key = 0;
        this.alphaUpdate();
        this.actionUpdate();
        this.keyUpdate();
    }

    // update key and elements based on alphabet change
    alphaUpdate() {
        this.alpha = d3.select("#alpha").property("value");
    }

    // update elements based on action selected
    actionUpdate() {
        this.action = d3.select("#actionSelect").property("value");
        if (this.action == "encrypt") {
            d3.select("#textLabel")
                .text("PLaintext: ");
            d3.select("#action")
                .text("Encrypt");
        } else if (this.action == "decrypt") {
            d3.select("#textLabel")
                .text("Ciphertext: ");
            d3.select("#action")
                .text("Decrypt");
        }
    }

    keyUpdate() {
        const curVal = parseInt(d3.select("#key").property("value"));
        if (isNaN(curVal)) {
            d3.select("#key").property("value", this.preKey);
        } else {
            this.preKey = this.key;
            this.key = curVal;
        }
    }

    // perform encryption or decryption and report to screen
    cryption() {
        const text = d3.select("#text").property("value");
        let outText = "";
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (!this.alpha.includes(char)) {
                outText += char;
            } else {
                if (this.action == "encrypt") {
                    outText += this.alpha[mod((this.alpha.indexOf(char) + this.key), this.alpha.length)];
                } else if (this .action == "decrypt") {
                    outText += this.alpha[mod((this.alpha.indexOf(char) - this.key), this.alpha.length)];
                }
            }
        }
        d3.select("#output p")
            .remove()
        d3.select("#output")
            .append("p")
            .text(`${this.action == "encrypt" ? "Cipher" : "Plain"}text: ${outText}`)
    }
}

// main
d3.select("#text").property("value", "")
const ciph = new cipher("abcdefghijklmnopqrstuvwxyz", "encrypt", 0);
window.ciph = ciph;