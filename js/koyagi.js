document.addEventListener("DOMContentLoaded", function() {
	const partsData = {
		"taishoku": Array.from({ length: 20 }, (_, i) => `${i + 1}.PNG`),
		"me": Array.from({ length: 11 }, (_, i) => `${i + 1}.PNG`),
		"mayu": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"mimi": Array.from({ length: 40 }, (_, i) => `${i + 1}.PNG`),
		"kuchi": Array.from({ length: 7 }, (_, i) => `${i + 1}.PNG`),
		"hoho": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"tsuno": Array.from({ length: 7 }, (_, i) => `${i + 1}.PNG`),
		"hidume": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"sippo": Array.from({ length: 40 }, (_, i) => `${i + 1}.PNG`),
		"kubiwa": Array.from({ length: 6 }, (_, i) => `${i + 1}.PNG`),
		"accessory": Array.from({ length: 3 }, (_, i) => `${i + 1}.PNG`),
		"senga": ["1.PNG"]
	};

	const partSelector = document.getElementById("partSelector");
	const composed = document.getElementById("composed");

	function generatePartSelector() {
		const partCategoryContainer = document.createElement('div');
		partCategoryContainer.className = 'part-category-container';
		const name = {
			"taishoku": "毛の色",
			"me": "目",
			"mayu": "眉",
			"mimi": "耳",
			"kuchi": "口",
			"hoho": "ほっぺ",
			"tsuno": "ツノ",
			"hidume": "ヒヅメ",
			"sippo": "しっぽ",
			"kubiwa": "kubiwa",
			"accessory": "アクセサリー",
		};
		Object.keys(partsData).forEach((category, index) => {
			if (category === "senga") return; // Skip "senga"

			const partCategory = document.createElement('div');
			partCategory.className = 'part-category';
			partCategory.dataset.part = category;
			partCategory.textContent = name[category];

			partCategory.addEventListener('click', function() {
				displayPartOptions(category);
			});

			partCategoryContainer.appendChild(partCategory);
		});

		partSelector.appendChild(partCategoryContainer);

		// Open the default category
	}

	function displayPartOptions(category) {
		// Hide all part options
		document.querySelectorAll('.part-options').forEach(container => {
			container.style.display = 'none';
		});

		// Hide all part categories
		document.querySelectorAll('.part-category').forEach(categoryElement => {
			categoryElement.style.backgroundColor = '#e0e0e0';
		});

		// Show the selected category's part options
		let partOptionsContainer = document.querySelector(`.part-options[data-category="${category}"]`);
		if (partOptionsContainer) {
			partOptionsContainer.style.display = 'flex';
		} else {
			partOptionsContainer = document.createElement('div');
			partOptionsContainer.className = 'part-options';
			partOptionsContainer.dataset.category = category;

			partsData[category].forEach(file => {
				const img = document.createElement('img');
				img.src = `img/koyagi/${category}/${file}`;
				img.alt = file;
				img.addEventListener('click', function() {
					updatePreview(category, file);
				});
				partOptionsContainer.appendChild(img);
			});

			partSelector.appendChild(partOptionsContainer);
		}

		// Highlight the selected category
		const selectedCategory = document.querySelector(`.part-category[data-part="${category}"]`);
		if (selectedCategory) {
			selectedCategory.style.backgroundColor = '#d0d0d0';
		}
	}

	function updatePreview(category, file) {
		// カテゴリーごとの z-index を定義
		const zIndexMap = {
			"taishoku": 1,
			"me": 2,
			"mayu": 3,
			"mimi": 4,
			"kuchi": 5,
			"hoho": 6,
			"tsuno": 7,
			"hidume": 8,
			"sippo": 9,
			"kubiwa": 10,
			"accessory": 11
		};
	
		// Get existing images from the preview
		const existingImages = Array.from(composed.getElementsByTagName('img'));
	
		// Remove images related to the current category
		existingImages.forEach(img => {
			if (img.dataset.category === category) {
				img.remove();
			}
		});
	
		// Add the new image for the selected category
		const newImage = document.createElement('img');
		newImage.src = `img/koyagi/${category}/${file}`;
		newImage.alt = file;
		newImage.dataset.category = category;
		newImage.style.zIndex = zIndexMap[category] || 0; // Default to 0 if category not found
		composed.appendChild(newImage);
	}
	

	// Generate the part selector UI
	generatePartSelector();

	// Set default image for senga
	updatePreview("senga", "1.PNG");

	// Open all part options
	displayPartOptions("taishoku");
	displayPartOptions("me");
	displayPartOptions("mayu");
	displayPartOptions("mimi");
	displayPartOptions("kuchi");
	displayPartOptions("hoho");
	displayPartOptions("tsuno");
	displayPartOptions("hidume");
	displayPartOptions("sippo");
	displayPartOptions("kubiwa");
	displayPartOptions("accessory");
	displayPartOptions("taishoku");

	updatePreview("taishoku", "1.PNG");
	updatePreview("me", "1.PNG");
	updatePreview("mayu", "1.PNG");
	updatePreview("mimi", "1.PNG");
	updatePreview("kuchi", "1.PNG");
	updatePreview("hoho", "1.PNG");
	updatePreview("tsuno", "1.PNG");
	updatePreview("hidume", "1.PNG");
	updatePreview("sippo", "1.PNG");
	updatePreview("kubiwa", "1.PNG");
	updatePreview("accessory", "1.PNG");

	// Save button functionality
	document.getElementById("saveButton").addEventListener("click", function() {
		html2canvas(composed, {
			backgroundColor: "#FFFFFF",
			scale: 2
		}).then(function(canvas) {
			var link = document.createElement('a');
			link.href = canvas.toDataURL("image/png", 1.0);
			link.download = 'composed_image.png';
			link.click();
		}).catch(function(error) {
			console.error("Error occurred while capturing the image:", error);
		});
	});
});
