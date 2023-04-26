const getUrl = (name: string = '') => {
	let url = 'https://api.api-ninjas.com/v1/city';
	url += '?name=' + name;
	return url;
};

export default async function handler(req: any, res: any) {
	const { name } = req.query;
	const weather = await fetch(getUrl(name), {
		headers: {
			'X-Api-Key': 'SVjA4DYznE05sT/3S2coog==di3fVTNKbBo0c3n1'
		}
	});
	const data = await weather.json();
	res.status(200).json(data);
}
