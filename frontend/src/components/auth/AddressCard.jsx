import PropTypes from 'prop-types'
export default function addressCard({
    _id,
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
}) {
    return (
        <div className="w-full h-max bg-transparent p-5 rounded-lg border border-neutral-600 grid grid-cols-12 gap-5">
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
                    <div className="w-full h-max break-all text-xl text-neutral-200">
                        Country
                    </div>
                    <div className="w-full h-max break-all text-lg font-light text-neutral-200">
                        {country}
                    </div>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
                    <div className="w-full h-max break-all text-xl text-neutral-200">
                        City
                    </div>
                    <div className="w-full h-max break-all text-lg font-light text-neutral-200">
                        {city}
                    </div>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
                    <div className="w-full h-max break-all text-xl text-neutral-200">
                        Address 1
                    </div>
                    <div className="w-full h-max break-all text-lg font-light text-neutral-200">
                        {address1}
                    </div>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
                    <div className="w-full h-max break-all text-xl text-neutral-200">
                        Address 2
                    </div>
                    <div className="w-full h-max break-all text-lg font-light text-neutral-200">
                        {address2}
                    </div>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
                    <div className="w-full h-max break-all text-xl text-neutral-200">
                        Zip Code
                    </div>
                    <div className="w-full h-max break-all text-lg font-light text-neutral-200">
                        {zipCode}
                    </div>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
                <div className="w-full h-max bg-neutral-700 rounded-lg flex flex-col gap-y-2">
                    <div className="w-full h-max break-all text-xl text-neutral-200">
                        Address Type
                    </div>
                    <div className="w-full h-max break-all text-lg font-light text-neutral-200">
                        {addressType}
                    </div>
                </div>
            </div>
        </div>
    );
}

addressCard.propTypes = {
    _id: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired,
    addressType: PropTypes.string.isRequired
};