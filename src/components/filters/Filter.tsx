const Filter = () => {
    return (
      <div className='mt-12 flex justify-between'>
      <div className="flex gap-6 flex-wrap">
      <select name="type" className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]" id="">
       <option value="">Type</option>
       <option value="physical">Physical</option>
       <option value="digital">Digital</option>
      </select>
      <input type="text" name="min" placeholder="min price" className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400" />
      <input type="text" name="max" placeholder="max price" className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400" />
      <select name="Size" className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]" id="">
       <option value="">Size</option>
       </select>
      <select name="Color" className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]" id="">
       <option value="">Color</option>

      </select>
      <select name="Catagory" className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]" id="">
       <option value="">Catagory</option>

      </select>


      </div>
      <div className="">


      <select name="" className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]" id="">
       <option value="">Sort by</option>
       <option value="physical">Price(low to high)</option>
       <option value="digital">Price(high to low)</option>
       <option value="physical">Newest</option>
       <option value="digital">Oldest</option>
 
      </select>

      </div>


      </div>
    )
  }
  
  export default Filter