(() => {
  const appendLocation = "#a";
  const container = document.querySelector(appendLocation);
  if (!container) {
    console.error(`"${appendLocation}" bulunamadı.`);
    return;
  }

  const STORAGE_KEY = "userManagementData";

  const addStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin: 8px 0;
        background-color: #f5f5f5;
        border-radius: 5px;
      }
      
      .user:hover {
        background-color: #e9e9e9;
      }
      
      button {
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
      
      .user button {
        background-color: #ff4d4d;
        color: white;
      }
      
      .user button:hover {
        background-color: #ff3333;
      }
      
      #attractBtn {
        background-color: #4CAF50;
        color: white;
        padding: 8px 12px;
        margin-top: 10px;
        width: 100%;
        font-weight: bold;
        transition: all 0.3s ease;
      }
      
      #attractBtn:hover {
        background-color: #45a049;
      }
      
      .empty-message {
        text-align: center;
        color: #666;
        padding: 20px;
      }
    `;
    document.head.appendChild(style);
  };

  addStyles();

  const getAppState = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("localStorage'dan veri ayrıştırılırken hata oluştu:", e);
    }
    
    return {
      users: generateFakeUsers(),
      expireTime: Date.now() + 24 * 60 * 60 * 1000,
      attractButtonUsed: false
    };
  };

  const saveAppState = (state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Verileri localStorage'a kaydederken hata oluştu:", e);
    }
  };

  const generateFakeUsers = () => {
    return [
      { id: 1, name: "Rıfat" },
      { id: 2, name: "Apo" },
      { id: 3, name: "Ahmet" },
      { id: 4, name: "Oğuzhan" },
    ];
  };

  const renderUsers = () => {
    container.innerHTML = "";
    const appState = getAppState();
    const users = appState.users;

    if (users.length) {
      const title = document.createElement("h3");
      title.textContent = "User List";
      title.style.marginBottom = "15px";
      container.appendChild(title);

      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.dataset.userId = user.id;

        const nameSpan = document.createElement("span");
        nameSpan.textContent = user.name;
        nameSpan.style.fontWeight = "bold";
        userDiv.appendChild(nameSpan);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteUser(user.id));
        userDiv.appendChild(deleteBtn);

        container.appendChild(userDiv);
      });
    } else {
      const emptyMessage = document.createElement("p");
      emptyMessage.classList.add("empty-message");
      emptyMessage.textContent = "Hiçbir kullanıcı mevcut değil";
      container.appendChild(emptyMessage);
    }
  };

  const showAttractButton = () => {
    if (container.querySelector("#attractBtn")) {
      return;
    }

    const appState = getAppState();
    
    if (appState.attractButtonUsed) {
      return;
    }

    const attractBtn = document.createElement("button");
    attractBtn.id = "attractBtn";
    attractBtn.textContent = "Kullanıcıları Listele";
    
    attractBtn.addEventListener("click", () => {
      attractUsers();
    });
    
    container.appendChild(attractBtn);
  };

  const deleteUser = (id) => {
    const appState = getAppState();
    appState.users = appState.users.filter((user) => user.id !== id);
    
    saveAppState(appState);
    renderUsers();
    
  };

  const attractUsers = () => {
    const appState = getAppState();
    
    appState.users = generateFakeUsers();
    appState.expireTime = Date.now() + 24 * 60 * 60 * 1000;
    appState.attractButtonUsed = true;
    
    saveAppState(appState);
    renderUsers();
  };

  const resetAttractButton = () => {
    const appState = getAppState();
    appState.attractButtonUsed = false;
    saveAppState(appState);
    console.log("Attract butonu sıfırlandı. Kullanıcıları sildiğinizde tekrar görünecek.");
    
    if (appState.users.length === 0) {
    }
  };

  window.resetAttractButton = resetAttractButton;
  
  const setupMutationObserver = () => {
    const observer = new MutationObserver(() => {
      const userElements = container.querySelectorAll(".user");
      const attractBtn = container.querySelector("#attractBtn");
      const appState = getAppState();
      
      if (userElements.length === 0 && !appState.attractButtonUsed) {
        if (!attractBtn) {
          showAttractButton();
        }
      } 
      else if (userElements.length > 0) {
        if (attractBtn) {
          attractBtn.remove();
        }
      }
    });
    
    observer.observe(container, { childList: true, subtree: true });
  };
  
  setupMutationObserver();
  renderUsers();
})();