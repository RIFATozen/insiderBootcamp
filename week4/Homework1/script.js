document.addEventListener("DOMContentLoaded", () => {
  const usersContainer = document.querySelector(".ins-api-users");

  const styles = document.createElement("style");
  styles.textContent = `
        .ins-api-users {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .users-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }
        
        .users-title {
            margin: 0;
        }
        
        .refresh-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .refresh-btn:hover {
            background-color: #2980b9;
        }
        
        .user-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 15px;
            position: relative;
            transition: transform 0.3s ease;
        }
        
        .user-card:hover {
            transform: translateY(-5px);
        }
        
        .user-name {
            color: #3498db;
            margin-top: 0;
            margin-bottom: 10px;
        }
        
        .user-info {
            color: #7f8c8d;
            margin: 5px 0;
        }
        
        .delete-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: #e74c3c;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .delete-btn:hover {
            background-color: #c0392b;
        }
        
        .error-message {
            background-color: #e74c3c;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .loading {
            text-align: center;
            padding: 20px;
            color: #7f8c8d;
        }
        
        .no-users {
            text-align: center;
            padding: 40px 0;
            color: #7f8c8d;
        }
    `;
  document.head.appendChild(styles);

  const header = document.createElement("div");
  header.className = "users-header";

  const title = document.createElement("h1");
  title.className = "users-title";
  title.textContent = "Kullanıcılar";

  const refreshBtn = document.createElement("button");
  refreshBtn.className = "refresh-btn";
  refreshBtn.textContent = "Verileri Yenile";
  refreshBtn.addEventListener("click", () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userDataTimestamp");
    fetchUsers();
  });

  header.appendChild(title);
  header.appendChild(refreshBtn);
  usersContainer.appendChild(header);

  const isLocalStorageDataValid = () => {
    const timestamp = localStorage.getItem("userDataTimestamp");
    if (!timestamp) return false;

    const storedTime = parseInt(timestamp);
    const currentTime = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    return currentTime - storedTime < oneDayInMs;
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("userDataTimestamp", new Date().getTime().toString());
  };

  const displayUsers = (users) => {
    const children = Array.from(usersContainer.children);
    children.forEach((child) => {
      if (!child.classList.contains("users-header")) {
        child.remove();
      }
    });

    if (users.length === 0) {
      const noUsers = document.createElement("div");
      noUsers.className = "no-users";
      noUsers.textContent =
        "Hiçbir kullanıcı mevcut değil. Kullanıcıları yüklemek için Verileri Yenile'ye tıklayın.";
      usersContainer.appendChild(noUsers);
      return;
    }

    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.setAttribute("data-id", user.id);

      const userName = document.createElement("h2");
      userName.className = "user-name";
      userName.textContent = user.name;

      const userUsername = document.createElement("p");
      userUsername.className = "user-info";
      userUsername.innerHTML = `<strong>Kullanıcı Adı:</strong> ${user.username}`;

      const userEmail = document.createElement("p");
      userEmail.className = "user-info";
      userEmail.innerHTML = `<strong>Eposta:</strong> ${user.email}`;

      const userPhone = document.createElement("p");
      userPhone.className = "user-info";
      userPhone.innerHTML = `<strong>Tel No:</strong> ${user.phone}`;

      const userAddress = document.createElement("p");
      userAddress.className = "user-info";
      userAddress.innerHTML = `<strong>Adres:</strong> ${user.address.city}, ${user.address.street}, ${user.address.suite}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "×";
      deleteBtn.addEventListener("click", () => deleteUser(user.id));

      userCard.appendChild(userName);
      userCard.appendChild(userUsername);
      userCard.appendChild(userEmail);
      userCard.appendChild(userPhone);
      userCard.appendChild(userAddress);
      userCard.appendChild(deleteBtn);

      usersContainer.appendChild(userCard);
    });
  };

  const deleteUser = (id) => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      let users = JSON.parse(userData);

      users = users.filter((user) => user.id !== id);

      saveToLocalStorage(users);

      displayUsers(users);
    }
  };

  const fetchUsers = () => {
    const loadingElement = document.createElement("p");
    loadingElement.className = "loading";
    loadingElement.textContent = "Kullanıcılar yükleniyor...";
    usersContainer.appendChild(loadingElement);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kullanıcılar getirilemedi.");
        }
        return response.json();
      })
      .then((data) => {
        saveToLocalStorage(data);
        displayUsers(data);
      })
      .catch((error) => {
        console.error("Kullanıcıları getirirken hata oluştu:", error);

        loadingElement.remove();

        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent =
          "Kullanıcılar yüklenemedi. Lütfen daha sonra tekrar deneyin.";
        usersContainer.appendChild(errorMessage);
      });
  };

  if (isLocalStorageDataValid()) {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const users = JSON.parse(userData);
      displayUsers(users);
    } else {
      fetchUsers();
    }
  } else {
    fetchUsers();
  }
});
