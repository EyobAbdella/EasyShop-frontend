import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { StoreContext } from "../context/StoreContext";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
  });
  const q = searchParams.get("q");
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='custom:hidden xl:flex border border-green-800 flex min-w-fit items-center  gap-x-1 bg-slate-200 rounded-full overflow-hidden py-1 px-2'>
        <AiOutlineSearch size={23} />
        <input
          className='bg-slate-200 outline-none placeholder:text-gray-900'
          type='text'
          placeholder='Search Products'
          value={q || ""}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("q", e.target.value);
              return prev;
            })
          }
        />
      </div>
      <div className='hidden custom:flex xl:hidden relative items-center'>
        <AiOutlineSearch onClick={() => setOpen(true)} size={23} />
        {open && (
          <div
            className='border border-green-800 flex absolute bg-slate-200 rounded-full px-2 py-1 right-0 top-0 gap-x-1'
            onBlur={() => setOpen(false)}
            tabIndex='0'>
            <AiOutlineSearch size={23} />
            <input
              className='bg-slate-200 outline-none placeholder:text-gray-900'
              type='text'
              placeholder='Search Products'
              value={q || ""}
              onChange={(e) =>
                setSearchParams((prev) => {
                  prev.set("q", e.target.value);
                  return prev;
                })
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
