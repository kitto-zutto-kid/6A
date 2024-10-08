document.addEventListener("DOMContentLoaded", function () {
	const partsData = {
		"taishoku": Array.from({ length: 20 }, (_, i) => `${i + 1}.PNG`),
		"me": Array.from({ length: 11 }, (_, i) => `${i + 1}.PNG`),
		"mayu": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"mimi": Array.from({ length: 40 }, (_, i) => `${i + 1}.PNG`),
		"kuchi": Array.from({ length: 7 }, (_, i) => `${i + 1}.PNG`),
		"hoho": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"tsuno": Array.from({ length: 8 }, (_, i) => `${i + 1}.PNG`),
		"hidume": Array.from({ length: 4 }, (_, i) => `${i + 1}.PNG`),
		"sippo": Array.from({ length: 40 }, (_, i) => `${i + 1}.PNG`),
		"kubiwa": Array.from({ length: 18 }, (_, i) => `${i + 1}.PNG`),
		"accessory": Array.from({ length: 11 }, (_, i) => `${i + 1}.PNG`),
		"haikei": Array.from({ length: 13 }, (_, i) => `${i + 1}.PNG`),
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
			"kubiwa": "首輪",
			"accessory": "アクセサリー",
			"haikei": "背景",
		};
		Object.keys(partsData).forEach(category => {
			if (category === "senga") return;

			const partCategory = document.createElement('div');
			partCategory.className = 'part-category';
			partCategory.dataset.part = category;
			partCategory.textContent = name[category];

			partCategory.addEventListener('click', function () {
				displayPartOptions(category);
			});

			partCategoryContainer.appendChild(partCategory);
		});

		partSelector.appendChild(partCategoryContainer);

	}

	function displayPartOptions(category) {
		document.querySelectorAll('.part-options').forEach(container => {
			container.style.display = 'none';
		});

		document.querySelectorAll('.part-category').forEach(categoryElement => {
			categoryElement.style.backgroundColor = '#e0e0e0';
		});

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
				img.addEventListener('click', function () {
					updatePreview(category, file);
				});
				partOptionsContainer.appendChild(img);
			});

			partSelector.appendChild(partOptionsContainer);
		}

		const selectedCategory = document.querySelector(`.part-category[data-part="${category}"]`);
		if (selectedCategory) {
			selectedCategory.style.backgroundColor = '#d0d0d0';
		}
	}

	function updatePreview(category, file) {
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
			"accessory": 11,
			"haikei": 0
		};

		const existingImages = Array.from(composed.getElementsByTagName('img'));

		existingImages.forEach(img => {
			if (img.dataset.category === category) {
				img.remove();
			}
		});

		const newImage = document.createElement('img');
		newImage.src = `img/koyagi/${category}/${file}`;
		newImage.alt = file;
		newImage.dataset.category = category;
		newImage.style.zIndex = zIndexMap[category] || 0;
		composed.appendChild(newImage);
	}


	generatePartSelector();

	Object.keys(partsData).forEach(category => {
		if (category === "senga") return;
		displayPartOptions(category);
	});

	displayPartOptions("taishoku");

	Object.keys(partsData).forEach(category => {
		updatePreview(category, `${partsData[category][Math.floor(Math.random() * partsData[category].length)]}`);
	});

	document.getElementById("saveButton").addEventListener("click", function () {
		html2canvas(composed, {
			backgroundColor: "#FFFFFF",
			scale: 4
		}).then(function (canvas) {
			var link = document.createElement('a');
			link.href = canvas.toDataURL("image/png", 1.0);
			link.download = 'koyagi.png';
			link.click();
		}).catch(function (error) {
			alert("保存に失敗しました。別のブラウザで開いてください。")
		});
	});
});
