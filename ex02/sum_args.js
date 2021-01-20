let sum = 0;
if (process.argv.length > 2)
{
	for(let i = 2; i < process.argv.length; i++)
	{
		if (!parseInt(process.argv[i]))
		sum += 0
		else
		sum += parseInt(process.argv[i], 10);
	}
}
console.log(sum);
