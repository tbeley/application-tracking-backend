module.exports = (sequelize, Sequelize) => {
  const Application = sequelize.define('application', {
    company: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Le nom de l'entreprise ne peut pas être vide." },
        notEmpty: { msg: "Le nom de l'entreprise ne peut pas être vide." },
      },
      set(value) {
        this.setDataValue('company', value.trim())
      },
    },
    company_infos: {
      type: Sequelize.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('company_infos', value.trim())
      },
    },
    job: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('job', value.trim())
      },
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('date', value.trim())
      },
    },
    method: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('method', value.trim())
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('description', value.trim())
      },
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('contact', value.trim())
      },
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('comment', value.trim())
      },
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('source', value.trim())
      },
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isIn: {
          args: [[0, 1, 2, 3]],
          msg: 'Le statut doit être 0, 1, 2 ou 3.',
        },
      },
    },
  })

  return Application
}
