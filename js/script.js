document.getElementById('calcForm').addEventListener('submit', function (event) {
	event.preventDefault();


	const weight = parseFloat(document.getElementById('weight').value);
	const height = parseFloat(document.getElementById('height').value);
	const age = parseInt(document.getElementById('age').value);
	const activityLevel = parseFloat(document.getElementById('activityLevel').value);
	const goal = parseInt(document.getElementById('goal').value);

	let gender = 0;

	let radio = document.querySelectorAll('.calc_radio');
	for (let i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			gender = radio[i].value;
			break;
		}
	}
	let bmr;

	if ((gender != 0) && (activityLevel != 0) && (goal != 0)) {

		// Расчет BMR по формуле Мифлина-Сен Жерара
		if (gender == 1) {
			bmr = 10 * weight + 6.25 * height - 5 * age + 5;
		} else {
			bmr = 10 * weight + 6.25 * height - 5 * age - 161;
		}

		// Общая калорийность
		totalCalories = Math.round(bmr * activityLevel);

		if (goal == 1) {
			totalCalories = Math.round(totalCalories * 0.85);
		}
		else if (goal == 2) {
			totalCalories = totalCalories;
		}
		else if (goal == 3) {
			totalCalories = Math.round(totalCalories * 1.15);
		}
		else totalCalories = 0;


		// Распределение макронутриентов
		const protein = Math.round(totalCalories * 0.25 / 4); // 25% от калорий
		const fat = Math.round(totalCalories * 0.25 / 9);   // 25% от калорий
		const carbs = Math.round(totalCalories * 0.50 / 4);  // 50% от калорий

		// Отображение результата
		document.getElementById('result').innerHTML = `
	<div class="main_result_text" id="age1"> ${age} </div>
	<div class="main_result_text" id="height1"> ${height} см</div>
	<div class="main_result_text" id="weight1"> ${weight} кг</div>
	<div class="main_result_text" id="al1"> ${activityLevel} </div>
	<div class="main_result_text" id="tc1"> ${totalCalories} ккал</div>
	<div class="main_result_text" id="protein1"> ${protein} г</div>
	<div class="main_result_text" id="carbs1"> ${carbs} г</div>
	<div class="main_result_text" id="fat1"> ${fat} г</div>
	`;


		document.getElementById('warning').innerHTML = `
	<div></div>
	`;
	}
	else {
		document.getElementById('warning').innerHTML = `
	<div>Введите все данные!</div>
	`;
	}
});

