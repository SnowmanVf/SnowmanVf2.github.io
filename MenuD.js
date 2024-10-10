
        let menuItems = [];

        // Cargar el menú desde el archivo XML
        function loadMenu() {
            fetch('menu.xml')
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, "text/xml");
                    const items = xmlDoc.getElementsByTagName("item");

                    for (let item of items) {
                        menuItems.push({
                            id: item.getAttribute("id"),
                            nombre: item.getElementsByTagName("nombre")[0].textContent,
                            enlace: item.getElementsByTagName("enlace")[0].textContent,
                            icono: item.getElementsByTagName("icono")[0].textContent,
                        });
                    }
                    renderMenu();
                });
        }

        // Renderizar el menú
        function renderMenu() {
            const menu = document.getElementById("menu");
            menu.innerHTML = '';
            menuItems.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${item.enlace}">${item.icono} ${item.nombre}</a>`;
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.onclick = () => deleteMenuItem(item.id);
                li.appendChild(deleteButton);
                menu.appendChild(li);
            });
        }

        // Agregar una opción al menú
        document.getElementById("addMenuItemForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const id = document.getElementById("itemId").value;
            const nombre = document.getElementById("itemNombre").value;
            const enlace = document.getElementById("itemEnlace").value;
            const icono = document.getElementById("itemIcono").value || '🔗';

            if (menuItems.some(item => item.id === id)) {
                alert("El ID debe ser único.");
                return;
            }

            menuItems.push({ id, nombre, enlace, icono });
            renderMenu();
            this.reset(); // Resetear el formulario
        });

        // Eliminar una opción del menú
        function deleteMenuItem(id) {
            menuItems = menuItems.filter(item => item.id !== id);
            renderMenu();
        }

        // Cargar el menú al iniciar
        loadMenu();
