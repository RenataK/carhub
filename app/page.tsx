"use client"; //no longer server side rendered

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';

export default function Home() {
	const [allCars, setAllCars] = useState([]);
	const [loading, setLoading] = useState(false);

	//search states
	const [manufacturer, setManufacturer] = useState("");
	const [model, setModel] = useState("");

	//filter states
	const [fuel, setFuel] = useState("");
	const [year, setYear] = useState("");

	//pagination state
	const [limit, setLimit] = useState("");

	const getCars = async () => {
		setLoading(true);

		try {
			const result = await fetchCars({
				manufacturer: manufacturer || '',
				year: parseInt(year) || 2022,
				fuel: fuel || '',
				limit: parseInt(limit) || 10,
				model: model || '',
			});
			setAllCars(result);
		} catch (error) {
				console.log(error)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getCars();
	}, [fuel, year, limit, manufacturer, model])
	

	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
			<Hero />

			<div className='mt-12 padding-x padding-y max-width' id="discover">
				<div className='home__text-container'>
					<h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
					<p>Discover Cars That Suit Your Taste</p>
				</div>

				<div className='home__filters'>
					<SearchBar
						setManufacturer={setManufacturer}
						setModel={setModel}
					/>

					<div className='home__filter-container'>
						<CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
						<CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
					</div>
				</div>

				{allCars.length > 0 ? (
					<section>
						<div className='home__cars-wrapper'>
							{allCars?.map((car) => (
								<CarCard car={car} />
							))}
						</div>

						{loading && (
							<div className='mt-16 w-full flex-center'>
								<Image
									src='/loader.svg'
									alt='loader'
									width={50}
									height={50}
									className='object-contain'
								/>
							</div>
						)}

						<ShowMore
							pageNumber={parseInt(limit) || 10 / 10}
							isNext={parseInt(limit) > allCars.length}
							setLimit={setLimit}
						/>
					</section>
				): (
					<div className='home__error-container'>
						<h2 className='text-black text-xl font-bold'>Opps, no results</h2>
						<p>{allCars?.message}</p>
					</div>
				)}

			</div>
    </main>
  )
}