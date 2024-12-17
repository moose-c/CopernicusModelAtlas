import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPublicResource } from "../services/message.service";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/button";
import { postModel } from "../services/message.service";

export const AddModelPage = () => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (event) => {
    let isMounted = true;

    event.preventDefault();

    const modellerInfo = {
      name: name,
      model: model,
    };

    const doPost = async (modellerInfo) => {
      const { data, error } = postModel(modellerInfo);
      setName("");
      setModel("");
    };

    doPost(modellerInfo);

    return () => {
      isMounted = false;
    };
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <p className="h1">Add model</p>
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-100 rounded shadow-md w-full max-w-md mx-auto space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Enter the name of your model:
            </label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Your model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </PageLayout>
  );
};
