export class Card {
  type = null;
  score = null;
  image = null;
  new = false;

  constructor(type, score, image) {
    this.type = type;
    this.score = score;
    this.image = image;
  }

  getType() {
    return this.type;
  }

  getScore() {
    return this.score;
  }

  getImage() {
    return this.image;
  }

  getNew() {
    return this.new;
  }

  setNew(value) {
    this.new = value;
  }
}
