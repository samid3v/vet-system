<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> f6f811d (modal ui search filter update)
import { useApp } from '../../../../../hooks/useApp';
import { toast } from 'react-toastify';
import api from '../../../../../helpers/axiosInstance';
import boardingUrl from '../../../../../urls/boarding';
import { useBoarding } from '../../../Hooks';

const Search = () => {
  const { setShowLoader, setShowFilterModal } = useApp();
<<<<<<< HEAD
  const { setBoarders, bookingStatus } = useBoarding();
=======
  const { refreshBoarders, refreshStats } = useBoarding();
>>>>>>> f6f811d (modal ui search filter update)
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    status: '',
  });

<<<<<<< HEAD
  const [maxDate, setMaxDate] = useState('')

  useEffect(()=>{
    getFormattedToday()
  },[])

  const getFormattedToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    setMaxDate(`${year}-${month}-${day}`);
  };

=======
>>>>>>> f6f811d (modal ui search filter update)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
     if (formData.start_date!=='' && formData.end_date!=='') {
          if (formData.start_date>formData.end_date) {
      toast.error('incorrect search dates');
               return
          }
     }
    formData.status = bookingStatus

    console.log(formData)
=======
    if (!formData.start_date || !formData.end_date || !formData.amount) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.patient_id === 'select') {
      toast.error('Select Patient Name fields.');
      return;
    }
>>>>>>> f6f811d (modal ui search filter update)

    try {
      setShowLoader(true);

<<<<<<< HEAD
      const response = await api.post(boardingUrl.search_boarding.url, formData, {
=======
      const response = await api.post(boardingUrl.add_boarding.url, formData, {
>>>>>>> f6f811d (modal ui search filter update)
        headers: {
          'Content-Type': 'application/json',
        },
      });

<<<<<<< HEAD
      if (response.status === 200) {
        setFormData({
          start_date: '',
          end_date: '',
          status: '',
        });
        console.log(response.data);
     setBoarders(response.data)
     setShowFilterModal(false)
      } else {
        console.error('Failed to searchind Boarding Record');
      }
    } catch (error) {
      toast.error(error.message);
=======
      if (response.status === 201) {
        setFormData({
          patient_id: '',
          start_date: '',
          end_date: '',
          notes: '',
          status: '',
          amount: '',
          description: '',
        });
        toast.success('Boarding Record added successfully!');
      } else {
        console.error('Failed to add Boarding Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
>>>>>>> f6f811d (modal ui search filter update)
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="bg-white p-3 overflow-x-hidden rounded-md shadow-xl">
<<<<<<< HEAD
      <h3 className="text-xl font-semibold">Search Boarding</h3>
=======
      <h3 className="text-xl font-semibold">Add Boarding</h3>
>>>>>>> f6f811d (modal ui search filter update)
      <form onSubmit={handleSearch}>
        <div className="flex flex-col gap-2 my-2 md:flex-row md:items-center">
          <div className="w-full md:w-1/2">
            <label htmlFor="start_date">Start Date</label>
            <input
              className="w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] "
              placeholder="start date..."
              type="datetime-local"
              name="start_date"
              id="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="end_date">End Date</label>
            <input
              className="w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] "
              placeholder="end date..."
              type="datetime-local"
              name="end_date"
              id="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-between items-center my-3">
          <button
            type="button"
            onClick={() => setShowFilterModal(false)}
            className="bg-gray-300 w-[80px] py-2 px-3 rounded-lg"
          >
            Close
          </button>
          <button type="submit" className="bg-primary py-2 px-3 rounded-lg">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
