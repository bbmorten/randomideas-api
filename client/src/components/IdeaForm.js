import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  validateForm(idea) {
    const errors = [];

    if (!idea.text || idea.text.trim() === "") {
      errors.push("Please add a text field");
    }

    if (!idea.tag || idea.tag.trim() === "") {
      errors.push("Please add a tag field");
    }

    if (!idea.username || idea.username.trim() === "") {
      errors.push("Please add a username");
    }

    return errors;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    const validationErrors = this.validateForm(idea);

    if (validationErrors.length > 0) {
      alert(validationErrors.join(", "));
      return;
    }

    localStorage.setItem("username", idea.username);

    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea to list

    this._ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closeModal"));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
