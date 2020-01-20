const faker 		= require('faker'),
	//   util 			= require('util'),
	  dbc 			= require('../models/connection.js'),
	//   ft_util 		= require('../includes/ft_util.js'),
	  count 		= 5;

function generate_user(i) {
	if (i === count) {
		console.log('Inserted ' + count + ' profile records.');
		process.exit();
	}

	function ranint(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}	
	const user = [
		faker.name.findName().replace(/\s/g, ''),				//0
		faker.name.firstName(),				//1
		faker.name.lastName(),				//2
		faker.internet.email(),				//3
		'Password1',							//4
		'1'
	];
	let sql = "SELECT id FROM users WHERE username = ? OR email = ?",
		id;

	dbc.query(sql, [user[0], user[3]], (err, result) => {
		if (err) throw err;
		if (result.length > 0)
		{
			console.log('Username or email already exists');
			generate_user(i);
			return;
		}
		sql = "INSERT INTO users (username, firstname, lastname, email, password, active) VALUES (?)";
		dbc.query(sql, [[...user]], (err, result) => {
			if (err) throw err;
			sql = "INSERT INTO profiles (userID, gender, sexualpref, biography, avator, image1, image2, image3, image4) VALUES (?)";
			id = result.insertId;
			dbc.query(sql, [[
					id,
					['male', 'female'][ranint(1)],		//3
					['both', 'female', 'male'][ranint(2)],	//4
					// faker.date.between('1940-01-01', '2000-12-31'),				//5
					faker.lorem.sentence(),		
					['42.png', 'dog.png', 'test2.jpg', 'test3.jpg', 'lona.png'][ranint(4)],	//4	
					['42.png', 'dog.png', 'test2.jpg', 'test3.jpg', 'lona.png'][ranint(4)],	//4	
					['42.png', 'dog.png', 'test2.jpg', 'test3.jpg', 'lona.png'][ranint(4)],	//4	
					['42.png', 'dog.png', 'test2.jpg', 'test3.jpg', 'lona.png'][ranint(4)],	//4	
					['42.png', 'dog.png', 'test2.jpg', 'test3.jpg', 'lona.png'][ranint(4)],	//4	
					
			]], (err, result) => {
				if (err) throw err;
				exit();
				sql = "INSERT INTO locations (lat, lng, street_address, area, state, country, user_id) VALUES (?)";
				dbc.query(sql, [[
						faker.address.latitude(),
						faker.address.longitude(),
						faker.address.streetAddress() + ' ' + faker.address.streetName(),
						faker.address.county(),
						faker.address.state(),
						faker.address.country(),
						id
					]], (err, result) => {
					if (err) throw err;
					generate_user(i + 1);
				});
			});
		});
	});
}
generate_user(0);