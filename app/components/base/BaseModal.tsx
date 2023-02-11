import { Dialog, Transition } from "@headlessui/react";
import type { PropsWithChildren } from "react";
import { Fragment } from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { XMarkIcon } from "@heroicons/react/24/outline";

type BaseModalProps = { atom: PrimitiveAtom<boolean>; title: string };

export const ModalBase = ({
  children,
  atom,
  title,
}: PropsWithChildren<BaseModalProps>) => {
  const [isOpen, setIsOpen] = useAtom(atom);

  function closeModal() {
    setIsOpen(false);
  }

  //   function openModal() {
  //     setIsOpen(true);
  //   }
  //   <div className="fixed inset-0 flex items-center justify-center">
  //   <button
  //     type="button"
  //     onClick={openModal}
  //     className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  //   >
  //     Open dialog
  //   </button>
  // </div>
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mb-4 flex items-center justify-between border-b-2 pb-1">
                  <Dialog.Title
                    as="h3"
                    className="bg-gradient-to-r from-blue-500 to-violet-800 bg-clip-text text-lg font-medium leading-6 text-transparent"
                  >
                    {title}
                  </Dialog.Title>
                  <button onClick={closeModal}>
                    <XMarkIcon className="h-6 w-6 cursor-pointer text-gray-500 transition-transform active:translate-y-[1px]" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
