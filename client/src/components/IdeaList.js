import IdeasApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    this._ideas = [];
    /*     this._ideas = [
      {
        text: 'An app that helps you find the best deals on flights',
        tag: 'technology',
        date: '2021-06-01',
        username: 'john_doe',
      },
      {
        text: 'A website that helps you learn new languages',
        tag: 'education',
        date: '2021-06-02',
        username: 'jane_doe',
      },
      {
        text: 'A platform that connects people who want to learn new skills',
        tag: 'education',
        date: '2021-06-03',
        username: 'john_doe',
      },
      {
        text: 'A website that helps you find the best deals on hotels',
        tag: 'business',
        date: '2021-06-04',
        username: 'jane_doe',
      },
      {
        text: 'An app that helps you find the best deals on flights',
        tag: 'technology',
        date: '2021-06-01',
        username: 'john_doe',
      },
      {
        text: 'A website that helps you learn new languages',
        tag: 'education',
        date: '2021-06-02',
        username: 'jane_doe',
      },
      {
        text: 'A platform that connects people who want to learn new skills',
        tag: 'education',
        date: '2021-06-03',
        username: 'john_doe',
      },
      {
        text: 'A website that helps you find the best deals on hotels',
        tag: 'business',
        date: '2021-06-04',
        username: 'jane_doe',
      }
    ]; */
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        console.log(e.target.parentElement.parentElement.id);
        const ideaId = e.target.parentElement.parentElement.id;
        console.log(ideaId);
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      console.log(ideaId);
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

// previous version of render method
/*   render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        return `
      <div class="card" id="${idea._id}">
      <button class="delete"><i class="fas fa-times"></i></button>
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
      `;
      })
      .join("");
    this.addEventListeners();
  } */
  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
      <div class="card" data-id="${idea._id}">
     ${deleteBtn}
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
      `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
