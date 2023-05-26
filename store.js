export class DiscountOffer {
    constructor(partnerName, expiresIn, discountRateInPercent) {
        this.partnerName = partnerName;
        this.expiresIn = expiresIn;
        this.discountInPercent = discountRateInPercent;
    }
}

class Partner {
    constructor(discountOffer) {
        this.discountOffer = discountOffer;
    }

    updateDiscount() {
        throw new Error('Method not implemented');
    }
}

class NormalPartner extends Partner {
    updateDiscount() {

        if (this.discountOffer.discountInPercent > 0) {
            this.discountOffer.discountInPercent -= this.discountOffer.expiresIn < 0 ? 2 : 1;
        }

        this.discountOffer.expiresIn -= 1;

        if (this.discountOffer.discountInPercent < 0) {
            this.discountOffer.discountInPercent = 0;
        }
    }
}

class NaturaliaPartner extends Partner {
    updateDiscount() {
        if (this.discountOffer.discountInPercent < 50) {
            this.discountOffer.discountInPercent += this.discountOffer.expiresIn < 1 ? 2 : 1;
        }

        this.discountOffer.expiresIn -= 1;

        if (this.discountOffer.discountInPercent > 50) {
            this.discountOffer.discountInPercent = 50;
        }
    }
}

class IlekPartner extends Partner {
    updateDiscount() {
       // No discount update needed for IlekPartner
    }
}

class VintedPartner extends Partner {
    updateDiscount() {
        
        if (this.discountOffer.expiresIn > 10) {
            this.discountOffer.discountInPercent += 1;
        }
        else if (this.discountOffer.expiresIn > 5) {
            this.discountOffer.discountInPercent += 2;
        }
        else if (this.discountOffer.expiresIn > 0) {
            this.discountOffer.discountInPercent += 3;
        }
        else {
            this.discountOffer.discountInPercent = 0;
        }

        this.discountOffer.expiresIn -= 1;

        if (this.discountOffer.discountInPercent > 50) {
            this.discountOffer.discountInPercent = 50;
        }
        
    }
}

class BackMarketPartner extends Partner {
    updateDiscount() {

        if (this.discountOffer.discountInPercent > 0) {
            this.discountOffer.discountInPercent -= this.discountOffer.expiresIn < 0 ? 4 : 2;
        }

        this.discountOffer.expiresIn -= 1;

        if (this.discountOffer.discountInPercent < 0) {
            this.discountOffer.discountInPercent = 0;
        }
    }
}


export class Store {
    
    constructor(discountOffers = []) {
        this.discountOffers = discountOffers;
    }

    createPartner(discountOffer) {
        switch (discountOffer.partnerName) {
            case 'Naturalia':
                return new NaturaliaPartner(discountOffer);
            case 'Ilek':
                return new IlekPartner(discountOffer);
            case 'Vinted':
                return new VintedPartner(discountOffer);
            case 'BackMarket':
                return new BackMarketPartner(discountOffer);
            default:
                return new NormalPartner(discountOffer);
        }
    }

    updateDiscounts() {
        this.discountOffers = this.discountOffers.map((discountOffer) => {
            const partner = this.createPartner(discountOffer);
            partner.updateDiscount();
            return partner.discountOffer;
        });

        return this.discountOffers;
    }

    
}
