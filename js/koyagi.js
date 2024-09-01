document.addEventListener("DOMContentLoaded", function() {
	const partsData = {
		"体色": Array.from({ length: 20 }, (_, i) => `${i + 1}.PNG`),
		"目": Array.from({ length: 11 }, (_, i) => `${i + 1}.PNG`),
		"眉": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"耳": Array.from({ length: 40 }, (_, i) => `${i + 1}.PNG`),
		"口": Array.from({ length: 7 }, (_, i) => `${i + 1}.PNG`),
		"ほっぺ": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"角": Array.from({ length: 7 }, (_, i) => `${i + 1}.PNG`),
		"ヒヅメ": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"しっぽ": Array.from({ length: 40 }, (_, i) => `${i + 1}.PNG`),
		"首輪": Array.from({ length: 6 }, (_, i) => `${i + 1}.PNG`),
		"アクセサリー": Array.from({ length: 3 }, (_, i) => `${i + 1}.PNG`),
		"体線画": ["1.PNG"]
	};

	const partSelector = document.getElementById("partSelector");
	const composed = document.getElementById("composed");

	function generatePartSelector() {
		const partCategoryContainer = document.createElement('div');
		partCategoryContainer.className = 'part-category-container';

		Object.keys(partsData).forEach((category, index) => {
			if (category === "体線画") return; // Skip "体線画"

			const partCategory = document.createElement('div');
			partCategory.className = 'part-category';
			partCategory.dataset.part = category;
			partCategory.textContent = category;

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
			"体色": 1,
			"目": 2,
			"眉": 3,
			"耳": 4,
			"口": 5,
			"ほっぺ": 6,
			"角": 7,
			"ヒヅメ": 8,
			"しっぽ": 9,
			"首輪": 10,
			"アクセサリー": 11
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

	// Set default image for 体線画
	updatePreview("体線画", "1.PNG");

	// Open all part options
	displayPartOptions("体色");
	displayPartOptions("目");
	displayPartOptions("眉");
	displayPartOptions("耳");
	displayPartOptions("口");
	displayPartOptions("ほっぺ");
	displayPartOptions("角");
	displayPartOptions("ヒヅメ");
	displayPartOptions("しっぽ");
	displayPartOptions("首輪");
	displayPartOptions("アクセサリー");
	displayPartOptions("体色");

	updatePreview("体色", "1.PNG");
	updatePreview("目", "1.PNG");
	updatePreview("眉", "1.PNG");
	updatePreview("耳", "1.PNG");
	updatePreview("口", "1.PNG");
	updatePreview("ほっぺ", "1.PNG");
	updatePreview("角", "1.PNG");
	updatePreview("ヒヅメ", "1.PNG");
	updatePreview("しっぽ", "1.PNG");
	updatePreview("首輪", "1.PNG");
	updatePreview("アクセサリー", "1.PNG");

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
